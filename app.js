const express = require('express');
const app = express();
const port = 3000;
const { getCollection } = require('./dbconnect');

const path = require('path');
const root = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.sendFile('index.html', { root });
});

app.get('/', (request, response) => {
    response.sendFile('menu.html', { root });
});




//gets


app.get('/api/v1/menu', async (request, response) => {
    try{
        const collection = await getCollection('finalscript', 'finalscript')
        const items = await collection.find({}).toArray();
        response.json(items)
    }catch (error){
        console.error(error)
        response.status(500).send('SERVER ERROR')
    }
})

app.get('/api/v1/menu/:id', async (request, response) => {
    try{
        const { id } = request.params
        const collection = await getCollection('finalscript', 'finalscript')
        const item = await collection.findOne({ menuId: parseInt(id) });
        response.json(item)
    }catch (error){
        console.error(error)
        response.status(500).send('SERVER ERROR')
    }
})

app.get('/api/v1/events', async (request, response) => {
    try{
        const collection = await getCollection('finalscript', 'Events')
        const items = await collection.find({}).toArray()
        response.json(items)
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: 'Server error ' })

    }
})

app.get('/api/v1/events/:id', async (request, response) => {
    try{
        const { id } = request.params
        const collection = await getCollection('finalscript', 'Events')
        const items = await collection.findOne({ eventId: parseInt(id) })
        response.json(items)
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: 'Server error ' })

    }
})






























//posts


app.post('/api/v1/menu', async (request, response) => {
    try {
        const { menuId, name, description, price } = request.body
        const collection = await getCollection('finalscript', 'finalscript')
        //const items = await collection.insertOne({ menuId, name, description, price })
        //
        //
        //
    const found = await collection.findOne({ menuId})
    if (found) response.status(400).json({ error: { message: `Menu with id: ${menuId}, already exists`} })
    else response.status(409).json({ menuId, name, description, price })

    const items = await collection.insertOne({ menuId, name, description, price })
    
} catch (error) {
    response.status(500).json({ error: { message: 'Internal server error', details: error.message } })
}

})



app.post('/api/v1/Events', async (request, response) => {
    try {
        const { eventId, name, location, date, time } = request.body;
        const collection = await getCollection('finalscript', 'Events')
        //
        const found = await collection.findOne({ eventId })
    if (found) response.status(400).json({ error: { message: `Event with id: ${eventId}, already exists`} })
    else response.status(409).json({ eventId, name, location, date, time })
        //
        const items = await collection.insertOne({ eventId })

        await collection.insertOne({ eventId, name, location, date, time })
    } catch (error) {
        response.status(500).json({ error: { message: 'Internal server error', details: error.message } })
    }
})











app.listen(port, () => console.log(`✅ Listening on http://localhost:${port}`));
