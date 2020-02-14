//import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/styles.css'
// import json from './assets/json.json'
// import xml from './assets/test.xml'
// import csv from './assets/test.csv'

import React from 'react'
import { render } from 'react-dom'


import WebpackLogo from './assets/images.png'
import './styles/less.less'
import './styles/scss.scss'
import './babel'

const post = new Post('Webpack Post Title', WebpackLogo);

//console.log('Post to  String:', post.toString())


//$('pre').addClass('code').html(post.toString())


const App = () => (

<div className="container">
    <h1>Webpack Course</h1>

    <div className="logo"></div>

    <hr />

    <hr />

    <div className="box">
        <h2>Less</h2>
    </div>

    <div className="card">
        <h2>sass</h2>
    </div>

</div>

)

render(<App />, document.getElementById('app'))



// console.log('json:', json)

// console.log('xml:', xml)

// console.log('csv:', csv)