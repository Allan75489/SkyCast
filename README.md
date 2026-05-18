# 🌦️ SkyCast

Aplicativo de previsão do tempo em **tempo real**, desenvolvido com **React + TypeScript + Vite**, com busca global de cidades, previsão estendida e interface responsiva.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 📸 Preview

<img width="1920" height="1140" alt="SkyCast Preview" src="https://github.com/user-attachments/assets/45beaa19-2176-493c-94ce-55c52c5ab798" />

---

## ✨ Funcionalidades

✔️ **Busca global** → Pesquise qualquer cidade do mundo  
✔️ **Temperatura atual** → Inclui sensação térmica  
✔️ **Condição climática** → Descrição + ícone do clima  
✔️ **Umidade do ar** → Percentual em tempo real  
✔️ **Velocidade do vento** → Dados em km/h  
✔️ **Probabilidade de chuva** → Previsão por hora  
✔️ **Nascer e pôr do sol** → Horários locais  
✔️ **Previsão para 7 dias** → Informações futuras  
✔️ **Próximas 8 horas** → Detalhamento climático  
✔️ **Bandeira do país** → Identificação automática  
✔️ **Fuso horário local** → Hora exata da cidade pesquisada  
✔️ **Tema claro/escuro** → Alternância dinâmica  
✔️ **Design responsivo** → Mobile, tablet e desktop  

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Função |
|------------|---------|
| React 18 | Construção da interface |
| TypeScript | Tipagem estática |
| Vite | Build e desenvolvimento |
| Open-Meteo API | Dados climáticos |
| CSS Variables | Sistema de temas |

---

## 📂 Estrutura do Projeto

```bash
src/
├── assets/               # Imagens e ícones
├── components/
│   ├── Loading/
│   ├── SearchBar/
│   └── WeatherCard/
│
├── hooks/
│   ├── useTheme.ts
│   └── useWeather.ts
│
├── pages/
│   └── Home.tsx
│
├── services/
│   └── weatherApi.ts
│
├── styles/
│   └── variables.css
│
├── types/
│   └── Weather.ts
│
├── App.tsx
└── main.tsx
```

---

## 🚀 Como executar

### Pré-requisitos

Instale:

- Node.js 18+
- Git

### Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
cd weather-app
```

### Instale as dependências

```bash
npm install
```

### Execute o projeto

```bash
npm run dev
```

Abra no navegador:

```bash
http://localhost:5173
```

---

> ⚡ Nenhuma API Key é necessária.  
> O projeto utiliza a **Open-Meteo API**, totalmente gratuita.

---

## 🔄 Fluxo de funcionamento

1. O usuário pesquisa uma cidade  
2. A aplicação usa **Open-Meteo Geocoding API** para obter coordenadas  
3. Os dados meteorológicos são buscados em tempo real  
4. O app exibe clima atual, previsão e informações complementares  
5. O horário respeita o **fuso local da cidade pesquisada**

---

## 🎯 Aprendizados

Este projeto foi desenvolvido para praticar:

- Consumo de APIs REST (`fetch`)
- Custom Hooks em React
- Organização em camadas
- TypeScript avançado
- Persistência com `localStorage`
- Responsividade
- Gerenciamento de temas
- Boas práticas de estruturação

---

## 👨‍💻 Autor

Desenvolvido por **Allan Gustavo**

💼 Frontend Developer em evolução  
🚀 Focado em React, TypeScript e desenvolvimento web

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
