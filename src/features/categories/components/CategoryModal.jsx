import React from 'react'

function CategoryModal({setShowModal, showModal, newLevel, newTitle,  setNewTitle, setNewLevel, handleAddCourse}) {
  return (
    <>
      {showModal && (
        <div
          className="modal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: '#333',
              padding: '30px',
              borderRadius: '10px',
              width: '400px', // افزایش عرض مدال
              color: 'white',
            }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>افزودن دسته جدید</h3>
            <input
              type="text"
              placeholder="عنوان جدید"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                width: '100%',
                marginBottom: '15px',
                padding: '12px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#444',
                color: 'white',
                fontSize: '16px',
              }}
            />
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              style={{
                width: '100%',
                marginBottom: '20px',
                padding: '12px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#444',
                color: 'white',
                appearance: 'none',
                fontSize: '16px',
              }}
            >
              <option value="">انتخاب سطح</option>
              <option value="مقدماتی">مقدماتی</option>
              <option value="متوسط">متوسط</option>
              <option value="پیشرفته">پیشرفته</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handleAddCourse}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '48%', // عرض یکسان برای دکمه‌ها
                  fontSize: '16px',
                }}
              >
                درست شدن
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '48%', // عرض یکسان برای دکمه‌ها
                  fontSize: '16px',
                }}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryModal
