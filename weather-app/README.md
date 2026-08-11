# 🌦️ SkyCast

Aplicativo de previsão do tempo em **tempo real**, desenvolvido com **React + TypeScript + Vite**, com busca global de cidades, geolocalização, favoritos, histórico e interface responsiva.

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Funcionalidades

| Feature | Descrição |
|---|---|
| 🔍 Busca com sugestões | Pesquise qualquer cidade e escolha entre múltiplos resultados |
| 📍 Localização automática | Clima da sua posição atual via geolocalização do navegador |
| ⭐ Favoritos | Salve cidades favoritas (persistido em `localStorage`) |
| 🕘 Histórico | Últimas cidades pesquisadas, sem duplicatas |
| 🌡️ Temperatura real | Temperatura atual e sensação térmica |
| ☁️ Condição climática | Descrição e ícone do tempo atual (códigos WMO) |
| 💧 Umidade, 💨 Vento, 🌧️ Precipitação | Estatísticas do clima atual |
| 🌅 Sol | Horário de nascer e pôr do sol, correto por timezone |
| 🕐 Previsão horária | Próximas horas com temperatura e chance de chuva |
| 🗓️ Previsão de 7 dias | Máxima, mínima e condição para a semana |
| 🌙 Tema | Alternância entre modo claro e escuro, com persistência |
| 💀 Skeleton loading | Feedback visual enquanto os dados carregam |
| ⚠️ Tratamento de erros | Estados específicos para cidade não encontrada, sem conexão e API indisponível |
| 📱 Responsivo | Mobile, tablet e desktop |
| ♿ Acessível | `aria-label`s e navegação por teclado |
| 📲 PWA | Instalável no dispositivo |

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Função |
|------------|---------|
| React 19 | Construção da interface |
| TypeScript | Tipagem estática |
| Vite | Build e desenvolvimento |
| Open-Meteo API | Geocoding, clima atual e previsão |
| CSS Variables | Sistema de temas |
| Vitest | Testes unitários |

---

## 🌐 API utilizada

O projeto consome exclusivamente a **[Open-Meteo API](https://open-meteo.com/)** (gratuita, sem necessidade de chave):

- **Geocoding API** — pesquisa de cidades e geocodificação reversa (usada pelo botão de localização).
- **Forecast API** — clima atual, previsão horária (24h) e previsão diária (7 dias), com timezone resolvido automaticamente pela própria API (`timezone=auto`), evitando bugs de fuso horário no cliente.

Todas as chamadas estão centralizadas em `src/services/weatherApi.ts`.

---

## 📂 Estrutura do projeto

```text
src/
├── components/
│   ├── SearchBar/         # Busca com sugestões de múltiplas cidades
│   ├── CurrentWeather/     # Card principal do clima atual
│   ├── WeatherStats/       # Vento, umidade, precipitação
│   ├── HourlyForecast/     # Previsão das próximas horas
│   ├── DailyForecast/      # Previsão de 7 dias
│   ├── SunInfo/            # Nascer e pôr do sol
│   ├── Favorites/          # Cidades favoritas
│   ├── History/            # Histórico de pesquisas
│   ├── LocationButton/     # Botão "usar minha localização"
│   ├── ThemeToggle/        # Alternância de tema
│   ├── Loading/            # Skeleton loading
│   └── ErrorState/         # Estados de erro com retry
│
├── hooks/
│   ├── useWeather.ts       # Orquestra busca por cidade/localização
│   ├── useTheme.ts         # Tema claro/escuro
│   ├── useFavorites.ts     # Favoritos (localStorage)
│   ├── useHistory.ts       # Histórico (localStorage)
│   └── useLocation.ts      # Geolocalização do navegador
│
├── services/
│   └── weatherApi.ts       # Todas as chamadas à Open-Meteo
│
├── utils/
│   ├── weather.ts          # Condição climática, bandeira do país
│   ├── date.ts             # Formatação de data/hora com timezone
│   ├── location.ts         # Wrapper de navigator.geolocation
│   └── __tests__/          # Testes unitários (Vitest)
│
├── types/
│   └── Weather.ts          # Tipos e interfaces da aplicação
│
├── pages/
│   └── Home.tsx            # Página principal
│
├── styles/
│   └── variables.css       # CSS variables de tema (claro/escuro)
│
└── App.tsx
```

---

## 🚀 Como executar

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# preview do build
npm run preview

# lint
npm run lint

# testes unitários
npm run test
```

---

## 📸 Preview

<img width="1920" height="1140" alt="SkyCast Preview" src="https://github.com/user-attachments/assets/45beaa19-2176-493c-94ce-55c52c5ab798" />

---

## 🚢 Deploy

O projeto é uma SPA estática (Vite build) e pode ser publicado em qualquer serviço de hospedagem estática — Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc. Basta rodar `npm run build` e publicar o conteúdo da pasta `dist/`.

---

## 👤 Autor

Allan Gustavo

---

## 📄 Licença

Distribuído sob a licença MIT. Veja [LICENSE](./LICENSE) para mais detalhes.
