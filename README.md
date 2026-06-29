
# Binance Proxy Backend

Backend Node.js + Express para proxy seguro da Binance API.

## Recursos
- Proxy autenticado Binance
- Suporte Testnet e Live
- CORS habilitado
- Segurança API Keys
- Endpoint Ping
- Proxy GET e POST
- Compatível com CryptoBot Mobile

## Instalação

```bash
npm install
```

## Executar

```bash
npm run dev
```

## Railway Deploy

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Endpoints

### Ping
GET /ping

### Proxy Binance
GET /proxy/*
POST /proxy/*

