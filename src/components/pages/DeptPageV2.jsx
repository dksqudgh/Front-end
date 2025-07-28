import DeptListV2 from "../dept2/DeptListV2"
import Footer from "../include/Footer"
import Header from "../include/Header"

const DeptPageV2 = ({depts, onAddItem}) => {
  return (
    <>
      <Header />
      <DeptListV2 depts={depts} onAddItem={onAddItem}/>
      <Footer />
    </>
  )
}

export default DeptPageV2