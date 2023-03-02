const express = require('express');
const cors = require('cors')
const {createProxyMiddleware:proxy} = require("http-proxy-middleware");
// Config
const { routes } = require('./config.json');

const app = express();
app.use(express.json())
app.use(cors())

app.use("/to-do-app",
    proxy({
        target: "[::1]:5000",
        "secure": false,
        pathRewrite: (path, req) => {
            return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
        }
    })
)

app.use("/image-upload",
    proxy({
        target: "[::1]:4000",
        "secure": false,
        pathRewrite: (path, req) => {
            return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
        }
    })
)



app.get('/',(req,res)=>{
    res.send("listening on port 3000-proxy app")
})

app.listen(3000, () => {
    console.log('Proxy listening on port 3000');
});