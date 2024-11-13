export default defineEventHandler((event) => {
  return server.handleNodeRequestAndResponse(event.node.req, event.node.res, {
    event,
  })
})
