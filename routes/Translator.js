// const express = require("express");
// const { response } = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const router = express.Router();
// const port = process.env.PORT || 5000;


// const app = express();
// app.use(cors());
// app.use(express.json());

// router.get('/translate', (req, res) => {
//     res.send("I am running as the server site of ZUSS Chat translator server")
// })

// router.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   });

// // app.use((req, res, next) => {
// //     res.setHeader('Access-Control-Allow-Origin', '*');
// //     next();
// //   });

// const { Configuration, OpenaAIApi, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEYT,
// });

// const openai = new OpenAIApi(configuration)

// router.post("/translate", async(req, res) => {
//     try{
//     const { target, text } = req.body;
//     if (!text || !target) {
//         return res.status(400).json({ error: "please filled you data" });
//     }
//     const trans = `(Please don't think deeply just translate) " ${text} " (please translate into ${target})`

//     const response =  await openai.createChatCompletion({
//           model: "gpt-3.5-turbo",
//           messages: [{role: "user", content: trans}],
//     })
//     if (response) {
//         res.status(200).json({ data: response["data"]["choices"][0]["message"]["content"] });
//     } else {
//         res.status(400).json({ data: "not found" });
//     }

// } catch (err) {
//     console.log(err);
// }
// })


// // const { response } = require("express");
// // const { Configuration, OpenAIApi } = require("openai");

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// // const chapGPT=async(prompt)=>{
// //     const response = await openai.createChatCompletion({
// //   model: "gpt-3.5-turbo",
// //   messages: [{role: "user", content: prompt}],
// // });
// // console.log(response["data"]["choices"][0]["message"]["content"]);
// // };

// // chapGPT("Can it please translate into chinese")


// module.exports=router;

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEYT,
});

const openai = new OpenAIApi(configuration);

router.get('/translate', (req, res) => {
    res.send("I am running as the server site of ZUSS Chat translator server site");
});

router.post("/translate", async (req, res) => {
    try {
        const { target, text } = req.body;
        if (!text || !target) {
            return res.status(400).json({ error: "Please fill in your data." });
        }

        const trans = `(Please don't think deeply, just translate) "${text}" (please translate into ${target})`;

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: trans }],
        });

        if (response && response.data.choices[0].message) {
            const translatedText = response.data.choices[0].message.content.trim();
            res.status(200).json({ data: translatedText });
        } else {
            res.status(400).json({ error: "Translation failed." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.use(router);



module.exports=router;