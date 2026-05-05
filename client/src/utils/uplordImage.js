import Axios from '../utils/Axios'
import SummaryApi from '../comman/SummaryApi'

const uplordImage = async (image) => {
  try {
    const formData = new FormData()
    formData.append('image', image)

    const response = await Axios({
      ...SummaryApi.uplordImage,
      data: formData
    })

    return response
  } catch (error) {
    return error
  }
}

export default uplordImage