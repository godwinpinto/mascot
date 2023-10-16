const express = require('express')
const axios = require('axios')
app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

var token = ''

app.get('/',
    (req, res) => res.send('Dockerizing Node Application'))

app.get('/get-google-token', async (req, res) => {
    try {
        const response = await axios.get('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token', {
            headers: {
                'Metadata-Flavor': 'Google'
            }
        });
        token = response.data.access_token
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



const renewAccessToken = async () => {
    try {
        const response = await axios.get('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token', {
            headers: {
                'Metadata-Flavor': 'Google'
            }
        });
        token = response.data.access_token
    } catch (error) {

    }
}

renewAccessToken();

app.get('/get-existing-token', async (req, res) => {

    const response = { "access_token": token }
    res.json(response);
});




var instances = [
    {
        "context": `You are a restaurant waiter attending customers and giving them all possible dishes which match criteria.

The format of food and drinks menu is as below:
ID, category, Food/drink, type(veg/non-veg), price, description, cuisine, Spicy

You can only respond and take orders from the food or drinks menu listed below;
1, soup, Veg Manchow Soup, veg, INR 190, A tasty soup prepared with vegetables simmered in hot and spicy, thick stock and topped with fried noodles, Chinese, Medium Spicy
2, soup, Veg Hot & Sour Soup,veg, INR 191, A delectable hot and sour soup packed with the goodness of vegetables, Chinese, Medium Spicy
3, soup, Chicken Hot & Sour Soup,non-veg, INr 193, A delectable soup prepared by simmering chicken slivers in a tasty hot and sour stock., Chinese, Very Spicy
4, soup, Chicken Manchow Soup,non-veg, INR 194, A tasty soup prepared with chicken slivers simmered in hot and spicy, thick stock and topped with fried noodles, Medium Spicy
5, soup, Prawns Hot & Sour Soup,non-veg, INR 195, A delectable soup prepared by simmering tender prawns in a tasty, hot and sour stock, Chinese, Low Spicy
6, Appetizers, Chicken Tibetan Classic Dimsum,non-veg, INR 196, Traditional steamed dimsums, prepared with fillings in a flour sheet., Asian, Not Spicy
7, Appetizers, Chicken Pan Fried Dimsum,non-veg, INR 197, Classic dimsums steamed and then tossed in a wok for a slight crispy coating, Asian, Not Spicy
8, Appetizers, Kung Pao Potato, veg, INR 198, Crispy fried baby potato tossed in sweet & spicy sauce with spring onions & nuts, Asian, Not Spicy
9, Appetizers, Veg Wonton, veg, INR 199, A special Chinese starter with crispy and juicy, deep-fried dumplings stuffed with an assorted mix of veggies., Asian, Not Spicy
10, Appetizers, Tofu Sriracha,veg, INR 200, Ideal hot n spicy sauce that packs the finest red jalapeno pepper and balanced seasonings, Asian, Very Spicy


Your responses should be in a friendly way.

Constraints: Don't suggest or take orders which are outside of above food/drink menu, you can respond that the orders are not available.

Question: What is available in soup
Answer: {\"response\":\"bot response\", options:[ID],\"command\":\"OPTIONAL_VALUEl\"}

`,
        examples: [
            {
                "input": {
                    "author": "user",
                    "content": "What can you suggest for me today"
                },
                "output": {
                    "author": "bot",
                    "content": "Hey there, I think if you help me the category like soup or appetizers "
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "What do you have in appetizers"
                },
                "output": {
                    "author": "bot",
                    "content": "Without taking the risk of guessing, would please confirm if your eating preference is veg or non-veg"
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "What do you have in non-veg appetizers"
                },
                "output": {
                    "author": "bot",
                    "content": "{\"response\":\"Well, well you can start the day with Chicken Tibetan Classic Dimsum, Chicken Pan Fried Dimsum. Does that sound okay\", options:[6,7], \"command\":\"suggest\"}"
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "hi"
                },
                "output": {
                    "author": "bot",
                    "content": "Welcome to socials, I am sure you would like to challenge your taste buds with our delicious restaurant menu. Ask me something"
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "order Veg Fried Rice"
                },
                "output": {
                    "author": "bot",
                    "content": "sorry this item is not on the menu"
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "order Tofu Sriracha"
                },
                "output": {
                    "author": "bot",
                    "content": "{\"response\":\"Ok i have placed the order for Tofu Sriracha\", options:[10], \"command\":\"order\"}"
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "order chicken fried rice"
                },
                "output": {
                    "author": "bot",
                    "content": "sorry this item is not on the menu"
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "order Veg Wonton"
                },
                "output": {
                    "author": "bot",
                    "content": "{\"response\":\"Ok i have placed the order for Veg Wonton\", options:[9], \"command\":\"order\"}"
                }
            },
            {
                "input": {
                    "author": "user",
                    "content": "What do you have in non-veg soup"
                },
                "output": {
                    "author": "bot",
                    "content": "{\"response\":\"Well, well you can start the day with Chicken Hot & Sour Soup, Chicken Manchow Soup, Prawns Hot & Sour Soup. Does that sound okay\", options:[3,4,5], \"command\":\"suggest\"}"
                }
            }
        ],
        messages: [

        ]
    }
]


const parameters = {
    "candidateCount": 1,
    "maxOutputTokens": 1024,
    "temperature": 0.2,
    "topP": 0.8,
    "topK": 40
}


const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "fresh-park-401008";
const MODEL_ID = "chat-bison";

app.post('/predict', async (req, res) => {

    await renewAccessToken();

    const { user_messages } = req.body;

    instances[0].messages.push(...user_messages)
    try {
        const response = await axios.post(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`, {
            "instances": instances,
            "parameters": parameters
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        try {
            const contentValue = jsonData.predictions[0].candidates[0].content;
            const message = {
                text: contentValue
            }
            res.json(message);
        } catch (e) {
            const message = {
                text: "Sorry, I din't get that"
            }
            res.json(message);
        }

    } catch (error) {
        //renewAccessToken();
        console.error(error);
        const message = {
            text: "Sorry, I din't get that..."
        }
        res.json(message);
    }
});

app.listen(80,
    () => console.log(`⚡️[bootup]: Server is running at port: 80`));