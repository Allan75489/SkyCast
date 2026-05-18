# 🌦️ SkyCast

> Aplicativo de previsão do tempo em tempo real, desenvolvido com React + TypeScript + Vite.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

<img width="1920" height="1140" alt="SkyCast Preview" src="https://github.com/user-attachments/assets/45beaa19-2176-493c-94ce-55c52c5ab798" />

---

## ✨ Funcionalidades

| Feature | Descrição |
|---|---|
| 🔍 Busca global | Pesquise qualquer cidade do mundo |
| 🌡️ Temperatura real | Temperatura atual e sensação térmica |
| ☁️ Condição climática | Descrição e ícone do tempo atual |
| 💧 Umidade | Percentual de umidade do ar |
| 💨 Vento | Velocidade em km/h |
| 🌧️ Chuva | Probabilidade por hora |
| 🌅 Sol | Horário de nascer e pôr do sol |
| 🗓️ Previsão | 7 dias à frente |
| 🕐 Horas | Próximas 8 horas detalhadas |
| 🇧🇷 Bandeira | Bandeira do país da cidade buscada |
| 🌐 Fuso horário | Hora local exata de cada cidade |
| 🌙 Tema | Alternância entre modo claro e escuro |
| 📱 Responsivo | Mobile, tablet e desktop |

---

## 🛠 Tecnologias

- **[React 18](https://react.dev/)** — biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** — tipagem estática
- **[Vite](https://vitejs.dev/)** — build tool e dev server
- **[Open-Meteo API](https://open-meteo.com/)** — dados climáticos gratuitos, sem API key
- **CSS Variables** — sistema de temas claro/escuro

---

## 📂 Estrutura do projeto

src/
├── assets/               # Ícones e imagens estáticas
├── components/
│   ├── Loading/          # Indicador de carregamento
│   ├── SearchBar/        # Campo de busca
│   └── WeatherCard/      # Card principal com dados do clima
├── hooks/
│   ├── useTheme.ts       # Gerenciamento de tema claro/escuro
│   └── useWeather.ts     # Lógica de busca e estado do clima
├── pages/
│   └── Home.tsx          # Página principal
├── services/
│   └── weatherApi.ts     # Integração com Open-Meteo
├── styles/
│   └── variables.css     # Variáveis CSS dos temas
├── types/
│   └── Weather.ts        # Interfaces e tipos TypeScript
└── App.tsx

---

## 🚀 Como rodar

**Pré-requisitos:** Node.js 18+

```bash
# Clone o repositório
git clone URL_DO_REPOSITORIO
cd weather-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

> Não é necessária nenhuma API key. O projeto usa a Open-Meteo, que é 100% gratuita.

---

## 📸 Como funciona

1. Digite o nome de qualquer cidade no campo de busca
2. O app geocodifica a cidade via **Open-Meteo Geocoding API**
3. Com as coordenadas, busca os dados climáticos em tempo real
4. Exibe temperatura, condição, previsão de 7 dias e muito mais
5. O horário exibido respeita o **fuso horário local** da cidade buscada

---

## 🎯 Aprendizados

Projeto desenvolvido para praticar:

- Consumo de APIs REST com `fetch`
- Custom Hooks com React (`useWeather`, `useTheme`)
- Tipagem avançada com TypeScript
- Organização de projeto em camadas (services, hooks, components)
- Sistema de temas com CSS Variables
- Layout responsivo sem frameworks CSS
- Persistência de preferências com `localStorage`

---

Desenvolvido por **Allan Gustavo**
