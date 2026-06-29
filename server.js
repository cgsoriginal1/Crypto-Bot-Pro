
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const BINANCE = {
  live: "https://api.binance.com",
  testnet: "https://testnet.binance.vision"
};

function getBase(mode) {
  return mode === "live"
    ? BINANCE.live
    : BINANCE.testnet;
}

app.get("/ping", async (req, res) => {
  try {
    res.json({
      status: "ok",
      server: "Binance Proxy Backend",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.get("/proxy/*", async (req, res) => {
  try {
    const mode = req.headers["x-proxy-mode"] || "testnet";
    const endpoint = req.params[0];

    const url = `${getBase(mode)}/${endpoint}`;

    const response = await axios.get(url, {
      params: req.query,
      headers: {
        "X-MBX-APIKEY": req.headers["x-mbx-apikey"] || ""
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.message,
      data: err.response?.data
    });
  }
});

app.post("/proxy/*", async (req, res) => {
  try {
    const mode = req.headers["x-proxy-mode"] || "testnet";
    const endpoint = req.params[0];

    const url = `${getBase(mode)}/${endpoint}`;

    const response = await axios.post(
      url,
      req.body,
      {
        params: req.query,
        headers: {
          "X-MBX-APIKEY": req.headers["x-mbx-apikey"] || "",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.message,
      data: err.response?.data
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Binance Proxy rodando na porta ${PORT}`);
});
