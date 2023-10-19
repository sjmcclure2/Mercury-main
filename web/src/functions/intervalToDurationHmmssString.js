export default function intervalToDurationHmmssString(interval) {
  const start = new Date(interval.start),
    end = new Date(interval.end)

  if (start > end)
    throw new RangeError('The start of an interval cannot be after its end')

  const duration = Math.floor((end - start) / 1000),
    seconds = duration % 60,
    minutes = Math.floor(duration / 60) % 60,
    hours = Math.floor(duration / 3600)

  const pad = (num) => num.toString().padStart(2, '0')

  return `${hours}h ${pad(minutes)}m ${pad(seconds)}s`
}
