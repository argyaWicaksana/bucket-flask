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
    return (
        <div className='mybox'>
            {props.data}
        </div>
    )
}

function Content(props) {
    const [buckets, setBuckets] = React.useState([])

    // Using Ajax
    function getBucket() {
        fetch("/bucket")
            .then(res => res.json())
            .then((result) => {
                setBuckets(result.map((bucket) => (
                    <li key={bucket._id.$oid} className='gap-3'>
                        <h2 className={bucket.done && 'done'}>✅ {bucket.bucket}</h2>
                        <button className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                        {
                            !bucket.done &&
                            <button className="btn btn-outline-primary"><i className="bi bi-check2"></i></button>
                        }
                    </li>
                )))
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
            })

        getBucket()
    }

    function filterBucket(keyword) {

    }

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
            <List data={buckets} />
        </div>
    )
}

export default Content