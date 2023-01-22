import React from 'react'
import '../styles/Content.css'

function Form(props) {
    return (
        <div className='mybox'>
            <div className='mybucket'>
                <input className="form-control" type="text" placeholder={props.placeholder} />
                <button className="btn btn-outline-primary">{props.button}</button>
            </div>
        </div>
    )
}

function List() {
    const [buckets, setBuckets] = React.useState([])
    // Using Ajax
    React.useEffect(() => {
        fetch("/bucket")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setBuckets(result.map((bucket) => (
                        <li key={bucket._id.$oid}>
                            <h2>✅ {bucket.bucket}</h2>
                            <button className="btn btn-outline-danger me-3"><i className="bi bi-trash3"></i></button>
                            <button className="btn btn-outline-primary"><i className="bi bi-check2"></i></button>
                        </li>
                    )))
                },
                (error) => {
                    console.log('Error telah terjadi!')
                    console.log(error.message)
                }
            )
    }, [])

    return (
        <div className='mybox'>
            {buckets}
            {/* <li>
                <h2>✅ Get a Scholarship</h2>
                <button className="btn btn-outline-danger me-3"><i className="bi bi-trash3"></i></button>
                <button className="btn btn-outline-primary"><i className="bi bi-check2"></i></button>
            </li> */}
        </div>
    )
}

function Content(props) {
    return (
        <div>
            {
                props.isFormShowed &&
                <Form
                    placeholder='Enter your bucket list item here'
                    button='Save'
                />
            }
            <Form
                placeholder='Search...'
                button='Search'
            />
            <List />
        </div>
    )
}

export default Content