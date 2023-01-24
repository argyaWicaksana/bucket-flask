import React from 'react'
import '../styles/Content.css'

function Form(props) {
    const [input, setInput] = React.useState('')

    const handleInputChange = (e) => setInput(e.target.value)
    const handleClickBtn = () => {
        resetInput()
        props.onInputChange(input)
    }
    const resetInput = () => setInput('')

    return (
        <div className='mybox'>
            <div className='mybucket'>
                <input
                    value={input}
                    className="form-control"
                    type="text"
                    onChange={handleInputChange}
                    placeholder={props.placeholder} />
                <button className="btn btn-outline-primary"
                    onClick={handleClickBtn}
                >{props.button}</button>
            </div>
        </div>
    )
}

function List(props) {
    const buckets = props.buckets
    const filterText = props.filterText
    const bucketList = []

    buckets.forEach(b => {
        if (!b.bucket.includes(filterText)) return

        bucketList.push(
            <ListBucket key={b._id.$oid}
                data={b}
                onDeleteClick={props.deleteBucket}
                onDoneClick={props.bucketDone}
            />
        )
    })

    return (
        <div className='mybox'>
            {bucketList}
        </div>
    )
}

function ListBucket(props) {
    const bucket = props.data
    const handleDeleteBtn = () => props.onDeleteClick(bucket._id.$oid)
    const handleDoneBtn = () => props.onDoneClick(bucket._id.$oid)
    return (
        <li className='gap-3'>
            <h2 className={bucket.done && 'done'}>✅ {bucket.bucket}</h2>
            <button onClick={handleDeleteBtn} className="btn btn-outline-danger">
                <i className="bi bi-trash3"></i>
            </button>
            {!bucket.done &&
                <button onClick={handleDoneBtn} className="btn btn-outline-primary">
                    <i className="bi bi-check2"></i>
                </button>
            }
        </li>
    )
}

function Content(props) {
    const [buckets, setBuckets] = React.useState([])
    const [filterText, setFilterText] = React.useState('')

    // Using Ajax
    function getBucket() {
        fetch("/bucket")
            .then(res => res.json())
            .then((result) => {
                setBuckets(result)
            },
                (error) => {
                    console.log('Error telah terjadi!')
                    console.log(error.message)
                }
            )
    }

    function addBucket(data) {
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bucket: data })
        }

        fetch("/bucket", requestMetadata)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                return getBucket()
            })
    }

    function deleteBucket(id) {
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        }

        fetch("/bucket/delete", requestMetadata)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                return getBucket()
            })
    }

    function bucketDone(id) {
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        }

        fetch("/bucket/done", requestMetadata)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                return getBucket()
            })
    }

    const filterBucket = (keyword) => setFilterText(keyword)

    React.useEffect(getBucket, [])

    return (
        <div>
            {
                props.isFormShowed &&
                <Form
                    placeholder='Enter your bucket list item here'
                    button='Save'
                    onInputChange={addBucket}
                />
            }
            <Form
                placeholder='Search...'
                button='Search'
                onInputChange={filterBucket}
            />
            <List
                filterText={filterText}
                buckets={buckets}
                deleteBucket={deleteBucket}
                bucketDone={bucketDone}
            />
        </div>
    )
}

export default Content