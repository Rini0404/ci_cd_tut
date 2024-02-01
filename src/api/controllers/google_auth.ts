// types of a req and res
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../../utils/serverError';

const CLIENT_ID = process.env.CLIENT_ID

const CLIENT_SECRET = process.env.CLIENT_SECRET

const REDIRECT_URI = process.env.REDIRECT_URI

exports.signUserIn = async (req: Request, res: Response) => {
  try {

    const { code } = req.query

    if (!code) return sendErrorResponse(res, "Error, try again.");

    const tokenData = await exchangeOfTokens(code as string);

    if (!tokenData) return sendErrorResponse(res, "Error, try again.");

    const { id_token } = tokenData;

    const decodedToken = jwt.decode(id_token);

    if (!decodedToken) {
      // Handle the case where the token could not be decoded.
      return sendErrorResponse(res, "Error, try again.");
    }

    if (typeof decodedToken !== 'string' && decodedToken.aud !== CLIENT_ID) {
      return sendErrorResponse(res, "Unrecognized client.", 401);
    }

    res.send(
      `<script>window.location.replace("exp://192.168.1.204:8081?userTkn=${decodedToken.sub}")</script>`
    );

  } catch (error) {

    console.log("error in signUserIn: ", error)

    sendErrorResponse(res, "Error, try again.")

  }


}

// define that the function is async and returns a Promise
const exchangeOfTokens = async (code: string): Promise<any> => {
  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) return null;

    return tokenData;

  } catch (error) {
    console.error("Error in exchangeOfTokens:", error);
    return null;
  }
};
