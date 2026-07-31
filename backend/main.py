import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel

# Inicializa o FastAPI
app = FastAPI(
    title="API de Previsão do Tempo",
    description="Backend em Python para consultar dados meteorológicos.",
    version="1.0.0"
)

# Configura o CORS para permitir que o Frontend (React, Vue, HTML/JS) acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, defina a URL exata do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chave da API do OpenWeather (Substitua pela sua chave real)
# Pegue sua chave gratuita em: https://openweathermap.org
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_KEY", "SUA_CHAVE_API_AQUI")
BASE_URL = "https://openweathermap.org"

# Modelo de dados para a resposta simplificada
class WeatherResponse(BaseModel):
    cidade: str
    temperatura: float
    sensacao_termica: float
    descricao: str
    umidade: int
    velocidade_vento: float

@app.get("/", tags=["Home"])
def home():
    """Rota inicial para verificar se o servidor está online."""
    return {"status": "Backend de Previsão do Tempo está online!"}

@app.get("/weather", response_model=WeatherResponse, tags=["Clima"])
async def get_weather(cidade: str = Query(..., description="Nome da cidade para consulta")):
    """
    Busca as condições climáticas atuais de uma cidade específica.
    """
    if OPENWEATHER_API_KEY == "SUA_CHAVE_API_AQUI":
        raise HTTPException(
            status_code=500, 
            detail="Erro de configuração: Substitua 'SUA_CHAVE_API_AQUI' por uma chave válida do OpenWeatherMap."
        )

    params = {
        "q": cidade,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric",  # Garante temperatura em Celsius e vento em m/s
        "lang": "pt_br"     # Retorna a descrição em português
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(BASE_URL, params=params)
            
            # Se a cidade não for encontrada ou a API falhar
            if response.status_code == 404:
                raise HTTPException(status_code=404, detail=f"Cidade '{cidade}' não encontrada.")
            elif response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Erro ao consultar o serviço climático externo.")
            
            data = response.json()
            
            # Modelagem e simplificação dos dados recebidos
            dados_formatados = {
                "cidade": data["name"],
                "temperatura": data["main"]["temp"],
                "sensacao_termica": data["main"]["feels_like"],
                "descricao": data["weather"][0]["description"].capitalize(),
                "umidade": data["main"]["humidity"],
                "velocidade_vento": data["wind"]["speed"]
            }
            
            return dados_formatados

        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Serviço de previsão do tempo indisponível no momento.")
