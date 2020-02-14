import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/styles.css'
// import json from './assets/json.json'
// import xml from './assets/test.xml'
// import csv from './assets/test.csv'
import WebpackLogo from './assets/images.png'

const post = new Post('Webpack Post Title', WebpackLogo);

//console.log('Post to  String:', post.toString())


$('pre').addClass('code').html(post.toString())


// console.log('json:', json)

// console.log('xml:', xml)

// console.log('csv:', csv)