// components/FormSection/BasicInfo.jsx
import { useDispatch, useSelector } from 'react-redux'
import { updateBasicInfo } from '../../features/resumeSlice'
import Input from '../UI/Input';


const BasicInfo = () => {
  const dispatch = useDispatch()
  const { basicInfo } = useSelector(state => state.resume)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(updateBasicInfo({ [name]: value }))
  }

  return (
    <div className="form-section">
      <h3>Basic Information</h3>
      <Input
        label="Full Name"
        name="name"
        value={basicInfo.name}
        onChange={handleChange}
        placeholder="John Doe"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={basicInfo.email}
        onChange={handleChange}
        placeholder="john@example.com"
      />
      <Input
        label="Phone"
        name="phone"
        value={basicInfo.phone}
        onChange={handleChange}
        placeholder="+1 (123) 456-7890"
      />
      <Input
        label="LinkedIn URL"
        name="linkedin"
        value={basicInfo.linkedin}
        onChange={handleChange}
        placeholder="https://linkedin.com/in/username"
      />
      <Input
        label="GitHub URL"
        name="github"
        value={basicInfo.github}
        onChange={handleChange}
        placeholder="https://github.com/username"
      />
      <Input
        label="Portfolio Website"
        name="portfolio"
        value={basicInfo.portfolio}
        onChange={handleChange}
        placeholder="https://yourportfolio.com"
      />
    </div>
  )
}

export default BasicInfo