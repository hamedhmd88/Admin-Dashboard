import React from 'react'
// import {courses} from '../../../core/courses'
function CategoryList({courses, onEdit, onDelete}) {
  return (
    <div>
    <>
    <div className="row">
      <div className="col-12">
        <div className="card">
        {/* //   {navigation.state !== 'idle' && <Spinner/>} */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th className=' text-center'>نام</th>
                <th className=' text-center'>سطح</th>
                <th className=' text-center'>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((category, index) => {
                // استایل های سفارشی برای رنگ بندی یکی در میان
      const rowStyle = {
        backgroundColor: index % 2 === 0 ? '#2C2C2C' : '#3A3A3A', // رنگ تیره برای ردیف ها
         // رنگ متن سفید
      };
                  // تابعی برای تعیین استایل بر اساس سطح
        const getLevelStyle = (level) => {
        let baseStyle = {
          padding: '5px 10px',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'inline-block',
          width: '100px', /* عرض ثابت */
          textAlign: 'center', /* متن وسط چین شده */
          verticalAlign: 'middle', /* عمودی وسط چین شده */
        };
        
        switch (level) {
          case 'مقدماتی':
            return { ...baseStyle, backgroundColor: '#3A7BF7', color: 'white' };
          case 'متوسط':
            return { ...baseStyle, backgroundColor: '#007BFF', color: 'white' };
          case 'پیشرفته':
            return { ...baseStyle, backgroundColor: '#0056b3', color: 'white' };
          default:
            return baseStyle;
        }
      };
                return (
                  <tr key={category.id} style={rowStyle}>
                  <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{category.title}</td>
                  <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <span style={getLevelStyle(category.courseLevel)}>{category.courseLevel}</span>
                  </td>
                  <td className="table-action" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                      <a className="ms-3" onClick={() => onEdit(index)} style={{ cursor: 'pointer' }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokewidth="2"
                          className="feather feather-edit-2 align-middle"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </a>
                      <a onClick={() => onDelete(index)} style={{ cursor: 'pointer' }}>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokewidth="2"
                          className="feather feather-trash align-middle"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="card-footer">
            {/* // <Pagination totalRecords={totalRecords}/> */}
          </div>
        </div>
      </div>
    </div>
  </> 
    </div>
  )
}

export default CategoryList
