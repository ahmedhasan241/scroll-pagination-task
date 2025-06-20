import axios from 'axios'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = query.page || 1

  try {
    const { data } = await axios.get(`http://13.60.56.112/api/posts`, {
      params: { page },
    })
    return data
  } catch (e: any) {
    return sendError(event, createError({
      statusCode: e.response?.status || 500,
      statusMessage: 'Failed to fetch posts from remote API',
    }))
  }
})
