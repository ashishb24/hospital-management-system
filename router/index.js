export default (app, express) => {
    const fs = require('fs');
    const files = fs.readdirSync('./router');
    const filteredFiles = files.filter(e => e.indexOf('index.js') === -1);
    const router = express.Router();
    router.get('/', (req, res) => {
        res.render('index', { title: "Node Boilerplate" })
    });
    let startedService = 0;
    let allRouters = filteredFiles.map((e, i) => {
        startedService++;
        const f = require("./" + e);
        f(router);
        return f;
    });
    app.use('/api/v1', router); // endpoint of api URL. v1(version 1);
};