const express = require('express'), 
app = express(); 
  
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
  
app.get('/',  
   (req, res) => res.send('Dockerizing Node Application')) 


app.get('/get-google-token', async (req, res) => {
try {
    const response = await axios.get('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token', {
    headers: {
        'Metadata-Flavor': 'Google'
    }
    });

    res.json(response.data);
} catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
}
});
  
app.listen(80,  
   () => console.log(`⚡️[bootup]: Server is running at port: 5000`));