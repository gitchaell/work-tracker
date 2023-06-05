# Work Tracker

Work Tracker te permite calcular el valor monetario de tus tareas diarias.
Proporciona herramientas para registrar y gestionar tareas, así como visualizar el valor monetario asociado a cada una.

## APIs

- OpenStreetMapAPI: Para obtener información de geolocalización y datos de direcciones.
- ExchangeRatesAPI: Para obtener tasas de cambio de divisas y conversiones monetarias.

## Entidades

### Geolocation Entity

Representa una ubicación geográfica.

| Propiedad | Tipo   | Descripción                       |
| --------- | ------ | --------------------------------- |
| id        | string | Identificador único de la entidad |
| country   | string | País                              |
| state     | string | Estado o provincia                |
| city      | string | Ciudad                            |
| address   | string | Dirección completa                |
| latitude  | number | Latitud geográfica                |
| longitude | number | Longitud geográfica               |

### Currency Entity

Representa una moneda.

| Propiedad | Tipo     | Descripción                                |
| --------- | -------- | ------------------------------------------ |
| id        | string   | Identificador único de la entidad          |
| name      | string   | Nombre de la moneda                        |
| code      | string   | Código de la moneda                        |
| decimals  | number   | Número de decimales de la moneda           |
| countries | string[] | Lista de países donde se utiliza la moneda |

### Work Entity

Representa un trabajo.

| Propiedad    | Tipo                 | Descripción                             |
| ------------ | -------------------- | --------------------------------------- |
| id           | string               | Identificador único de la entidad       |
| title        | string               | Título o nombre del trabajo             |
| minSalary    | number               | Salario mínimo nacional                 |
| experience   | WorkExperienceValues | Tu nivel de experiencia                 |
| demand       | WorkDemandValues     | El nivel de demanda de tu profesion     |
| profitMargin | { perMonth: number } | Margen de ganancia mensual              |
| costs        | { perMonth: number } | Tus costos de vida mensuales            |
| workHours    | { perDay: number }   | Horas de trabajo por día                |
| workDays     | { perWeek: number }  | Días de trabajo por semana              |
| rate         | RateValues           | Tarifas del trabajo                     |
| currencyId   | string               | ID de la moneda utilizada en el trabajo |
| createdAt    | string               | Fecha de creación del trabajo           |

### TaskEntity

Representa una tarea.

| Propiedad   | Tipo                | Descripción                             |
| ----------- | ------------------- | --------------------------------------- |
| id          | string              | Identificador único de la entidad       |
| description | string              | Descripción de la tarea                 |
| seconds     | number              | Tiempo dedicado a la tarea en segundos  |
| amount      | number              | Monto acumulado a cobrar por la tarea   |
| done        | boolean             | Indica si la tarea está completada      |
| status      | 'running', 'paused' | Estado de la tarea                      |
| workId      | string              | ID del trabajo relacionado con la tarea |

## Diagrama de Entidades

```mermaid
classDiagram
  class Geolocation {
    id: string
    country: string
    state: string
    city: string
    address: string
    latitude: number
    longitude: number
  }

  class Currency {
    id: string
    name: string
    code: string
    decimals: number
    countries: string[]
  }

  class Work {
    id: string
    title: string
    minSalary: number
    experience: WorkExperienceValues
    demand: WorkDemandValues
    profitMargin: {
      perMonth: number
    }
    costs: {
      perMonth: number
    }
    workHours: {
      perDay: number
    }
    workDays: {
      perWeek: number
    }
    rate: {
      perSecond: number
      perMinute: number
      perHour: number
      perDay: number
      perWeek: number
      perMonth: number
      perYear: number
    }
    currencyId: string
    createdAt: string
  }

  class Task {
    id: string
    description: string
    seconds: number
    amount: number
    done: boolean
    status: TaskStatusValues
    workId: string
  }

  class WorkExperienceValues {
    values: string[]
  }

  class WorkDemandValues {
    values: string[]
  }

  class TaskStatusValues {
    values: string[]
  }

  Geolocation --> Task
  Work --> Currency
  Work --> WorkExperienceValues
  Work --> WorkDemandValues
  Task --> Work
  Task --> TaskStatusValues

```
