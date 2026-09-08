import React from 'react'

// icon 값만 내려받아서 동작하는 아이콘 버튼용 컴포넌트
const IconButton = ({ icon, onClick }) => {
  return (
    <button onClick={onClick} className={`w-8 text-xl font-semibold cursor-pointer`}>
        {icon}
    </button>
  )
}

export default IconButton