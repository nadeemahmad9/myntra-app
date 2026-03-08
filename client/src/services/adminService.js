import api from "../utils/api"

export const adminService = {
  async getStats() {
    // GET /api/admin/stats (must be protected+admin on backend)
    return api.get("/admin/stats")
  },
}
