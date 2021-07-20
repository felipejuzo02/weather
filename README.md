# Weather App
# O projeto
O projeto é baseado no desafio do site DevChallanges.io, sendo que a api foi fornecido pelos mesmos

- Link do projeto: https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv
- Link da API: https://www.metaweather.com/api/

O desafio é cumprir todas as histórias de usuários propostas e publicar o app em um domínio público.

# Tecnologias utilizadas
Para a construção do App foi utilizado as seguintes tecnologias:
- Vue 3
- VueX
- Axios
- SCSS
- API Rest
- Insomnia

# Os componentes
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

<br>

Depois disso feito, foi realizado os seguintes componentes:
- RoundButton
- DrawerStructure (Serve de estrutura pros outros)
- DrawerSearch
- DrawerDetails
- SearchItem (Item de pesquisa)

<br>

Os componentes recebem seus valores por meio de `props` e/ou `slot`

# Os icones e imagens
- As imagens vem por meio da API
- Os icones foram pegos do Material Icons, sendo que foi feito o download e utilizado o `SvgGo` para deixá-los menores

# Helpers
Para ajudar na formatação dos valores e evitar a repetição de código, foi realizado a criação de dois `helpers`. Um serve para formatar números decimais e deixá-los inteiro. O outro serve para a formatação de datas, para mostrar os dias da semana (Tomorrow / Wed, July 19)

# Store
Para utilização do `Store`, foi utilizado o `Axios`, sendo que o primeiro passo, foi definir a URL padrão para consumir a API
```
axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/'
```

Devido problema com o CORS, foi utilizado o link do cors-anywhere-herokuapp para poder utilizar a API. Depois de um determinado tempo, é necessário realizar o `request` no servidor temporário no seguinte link:
- https://cors-anywhere.herokuapp.com/corsdemo

<br>

- Para buscar uma cidade específica, utilizei uma `action` passando o ID da cidade, assim setando um valor no data da `Home` para buscar os valores a partir de lá
- Para realizar a busca de cidades, foi utilizado uma `actions` para setar os valores de um `array`. Na `action foi passado o parâmetro de pesquisa conforme documentação da API
```
location/search/?query=NOME_DA_PESQUISA
```

# Erros ao desenvolvolver
A fim de manter feedback e relatar minha experiência no projeto, algumas observações:
- Realizar o mobile-first
- Ao criar os componentes, usar API no começo para não quebrar posteriormente