# Weather App
# O projeto
O projeto é baseado no desafio do site DevChallanges.io, sendo que a api foi fornecido pelos mesmos

Link do projeto: https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv
Link da API: https://www.metaweather.com/api/

O desafio é cumprir todas as histórias de usuários propostas e publicar o app em um domínio público.

# Tecnologias utilizadas
Para a construção do App foi utilizado as seguintes tecnologias:
- Vue 3
- VueX
- Axios
- SCSS
- API Rest
- Insomnia

# Primeiros passos
O primeiro passo foi construir a estrutura do projeto, como primeiro passo, foi instalo o Node.js para utilização do `NPM`

Logo após, foi utilizando o CLI do Vue 3
```
npm install -g @vue/cli
```

Depois foi criado o projeto com
```
vue create weather
```

# Criação de variaveis
Para melhor padronização do projeto, foi criado algumas variáveis padrões, tal como de cores ($grey1, $grey2, etc) e espaçamentos (mt-sm, mt-lg, pt-md)

# Inicio dos códigos
Como primeiros códigos, eu dei início na criação dos componentes de card, sendo eles:
- AnCard (Como estrutura)
- AnCardTemperatureWeek
- AnCardTodayInformation

Pro card de informações do dia, foi deixado um `slot` na parte inferior para que personalizasse conforme design proposto, sendo que eu cada chamada do componente, usei um variação, uma de direção do vento e outra de percentual de umidade

## Direção do vento
Realizada utilizando como base a rosa dos ventos. Para realização, usei variáveis do css, passando por binding conforme uma computada que verifica a nomenclature vinda da API.

- No template
```
:style="`--prog: ${degress}deg`"
```

- No script
```
degress () {
      if (this.todayInformation.wind_direction_compass === 'N') {
        return -43.5
      } else if (this.todayInformation.wind_direction_compass === 'NNE') {
        return -21
      } else if (this.todayInformation.wind_direction_compass === 'NE') {
        return 1.5
      } else if (this.todayInformation.wind_direction_compass === 'ENE') {
        return 24
      } else if (this.todayInformation.wind_direction_compass === 'E') {
        return 48.5
      } else if (this.todayInformation.wind_direction_compass === 'ESE') {
        return 71
      } else if (this.todayInformation.wind_direction_compass === 'SE') {
        return 93.5
      } else if (this.todayInformation.wind_direction_compass === 'SSE') {
        return 116
      } else if (this.todayInformation.wind_direction_compass === 'S') {
        return 138.5
      } else if (this.todayInformation.wind_direction_compass === 'SSW') {
        return 161
      } else if (this.todayInformation.wind_direction_compass === 'SW') {
        return 183.5
      } else if (this.todayInformation.wind_direction_compass === 'WSW') {
        return 206
      } else if (this.todayInformation.wind_direction_compass === 'W') {
        return 228.5
      } else if (this.todayInformation.wind_direction_compass === 'WNW') {
        return 251
      } else if (this.todayInformation.wind_direction_compass === 'NW') {
        return 273.5
      } else {
        return 296
      }
    }
```

- No style
```
transform: rotate(var(--prog));
```

## Barra de umidade
Para a barra de umidade também foi utilizada variáveis de css, sendo que o valor vem da api

- No template
```
:style="`--prog: ${this.todayInformation.humidity}%`"
```

- No style
```
width: var(--prog);
```
