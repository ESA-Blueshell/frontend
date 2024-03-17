/**
 * Format the event time to a human readable format
 *
 * @param {Object} event - The event object
 */
export function $formatEventTime(event) {
  let startTime = new Date(Date.parse(event.startTime))
  let endTime = new Date(Date.parse(event.endTime))

  let result = ''

  if (event.membersOnly) {
    result += 'Members-only event. '
  }

  result += startTime.toLocaleString('en-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
  result += '-'

  if (startTime.getDate() !== endTime.getDate()) {
    result += endTime.toLocaleString('en-NL', {day: 'numeric', month: 'long'})
  }
  result += endTime.toLocaleString('en-NL', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return result
}
