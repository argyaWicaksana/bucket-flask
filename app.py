import os, json
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util, ObjectId

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MONGODB_URI = os.environ.get('MONGODB_URI')
DB_NAME = os.environ.get('DB_NAME')

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

app = Flask(__name__)
CORS(app)

def parse_json(data):
    data = json.loads(json_util.dumps(data))
    return data

@app.route('/')
def home():
   return render_template('index.html')


@app.route("/bucket", methods=["POST"])
def bucket_post():
    bucket = request.form['bucket']
    num = db.bucket.count_documents({})
    num += 1

    doc = {
        'num': num,
        'bucket': bucket,
        'done': 0
    }
    db.bucket.insert_one(doc)

    return jsonify({'msg': 'Data saved!'})


@app.route("/bucket/done", methods=["POST"])
def bucket_done():
    num = request.form['num']
    db.bucket.update_one(
        {'num': int(num)},
        {'$set': {'done': 1}}
    )
    return jsonify({'msg': 'Update done!'})


@app.route("/bucket/delete", methods=["POST"])
def bucket_delete():
    data_id = request.form['id']
    db.bucket.delete_one( {'_id': ObjectId(data_id)})
    return jsonify({'msg': 'Deleted!'})

@app.route("/bucket", methods=["GET"])
def bucket_get():
    list_bucket = list(db.bucket.find())
    return parse_json(list_bucket)

if __name__ == '__main__':
   app.run('localhost', port=5000, debug=True)