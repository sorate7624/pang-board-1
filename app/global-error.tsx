"use client"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

GlobalError.getInitialProps = ({ response, error }) => {
  const statusCode = response ? response.statusCode : error ? error.statusCode : 404
  return { statusCode }
}
