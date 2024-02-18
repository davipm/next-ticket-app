import axios from "axios";

export async function getTicketByID(id) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/tickets/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
