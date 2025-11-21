import { response } from "express";
import Link from "../models/Link.js";
import { customAlphabet } from 'nanoid';


// post -  /api/links    (To create a short link)
export const createLink = async (req,res) => {
    try {
        let {url, code} = req.body;
        const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const customCode = customAlphabet(alphanumeric, 6)
        const shortCode = code || customCode();

        const exist = await Link.findOne({code: shortCode});

        if(exist) {
            return res.status(409).json({message: "Code already exist."}) 
        }

        if(!url.startsWith("http://") && !url.startsWith("https://")){
            url = "https://" + url;
        }

        const link = await Link.create({url, code: shortCode,});

        res.status(201).json({link});

    } catch (error) {
        res.status(500).json({message: `Server error: ${error}`})
    }
};

// get - /api/links       (To get all created links)

export const getList = async(req, res) => {
    try{
        const links = await Link.find().sort({createdAt:-1});
        res.json(links)

    } catch (error){
        res.json({message: `${error}`})
    }
}

// get - /api/links/:code   (To get statistics for a particular short link)

export const getStats = async(req, res) => {
    try {
          const link = await Link.findOne({code: req.params.code});
          if (!link){
              return res.status(404).json({message: "Not found"});
          }
          res.json(link)
    } catch (error) {
        res.json({message: `${error}`})
    }
}

//get /:code (To redirect on original url)

export const redirectUrl = async(req, res) => {
    try {
          const link = await Link.findOne({code: req.params.code});

          if (!link){
              return res.status(404).json({message: "Link Not found"});
          }

        link.clicks += 1
        link.lastClicked = new Date();
        
        await link.save();

        return res.redirect(302, link.url);
    } catch(error) {
        res.json({message: `${error}`})
    }
    

}


// delete /api/links/:code

export const deleteLink = async(req, res) => {
    try {
        const receivedCode = req.params.code
        const deleteLink = await Link.findOneAndDelete({code: receivedCode})

        if(!deleteLink) {
            return res.status(404).json({success: falase , message: "Not found"});
        }

        res.json({success: true , message: "Deleted successfully."})

    } catch( error) {
        res.json({error: `error${error}`})
    }
}



