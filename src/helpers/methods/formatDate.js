const options = { weekday: 'short', month: 'long', day: 'numeric' }

export default function (model, type) {
  const date = new Date(model)
  date.setDate(date.getDate() + 1)

  if (date.getDate() === new Date().getDate()) {
    return 'Today'
  }

  if (date.getDate() > new Date().getDate() && date.getDate() < (new Date().getDate() + 2)) {
    return 'Tomorrow'
  }

  return date.toLocaleDateString(type, options)
}
