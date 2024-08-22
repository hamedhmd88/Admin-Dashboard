import React, { Suspense, useState } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom';
import {httpInterceptedService} from '../core/http-service.js';
import CategoryList from '../features/categories/components/CategoryList.jsx';
import { courses } from '../core/courses.js';
import CategoryModal from '../features/categories/components/CategoryModal.jsx';

function CourseCategories() {
  const data = useLoaderData();

  const [addcourse, setAddCourse] = useState(courses);
  const [sortedCourses, setSortedCourses] = useState(courses);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddCourse = () => {
    if (newTitle.trim() !== '' && newLevel.trim() !== '') {
      const newCourse = {
        id: addcourse.length + 1,
        title: newTitle,
        courseLevel: newLevel,
      };

      if (editIndex !== null) {
        const updatedCourses = [...addcourse];
        updatedCourses[editIndex] = newCourse;
        setAddCourse(updatedCourses);
        setSortedCourses(updatedCourses);
        setEditIndex(null);
      } else {
        setAddCourse([...addcourse, newCourse]);
        setSortedCourses([...addcourse, newCourse]);
      }

      setShowModal(false);
      setNewTitle('');
      setNewLevel('');
    } else {
      alert('لطفاً همه فیلدها را پر کنید.');
    }
  };

  const handleEdit = (index) => {
    setNewTitle(addcourse[index].title);
    setNewLevel(addcourse[index].courseLevel);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedCourses = addcourse.filter((_, i) => i !== index);
    setAddCourse(updatedCourses);
    setSortedCourses(updatedCourses);
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;

    const sortedList = [...addcourse].sort((a, b) => {
      if (sortBy === 'مقدماتی') {
        return a.courseLevel === 'مقدماتی' ? -1 : b.courseLevel === 'مقدماتی' ? 1 : 0;
      } else if (sortBy === 'متوسط') {
        return a.courseLevel === 'متوسط' ? -1 : b.courseLevel === 'متوسط' ? 1 : 0;
      } else if (sortBy === 'پیشرفته') {
        return a.courseLevel === 'پیشرفته' ? -1 : b.courseLevel === 'پیشرفته' ? 1 : 0;
      }
      return 0;
    });

    setSortedCourses(sortedList);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <a className="btn btn-primary fw-bolder mt-n1" onClick={() => setShowModal(true)}>
            افزودن دسته جدید
          </a>
          <select onChange={handleSort} className="form-select w-auto">
            <option value="">مرتب سازی بر اساس سطح</option>
            <option value="مقدماتی">مقدماتی</option>
            <option value="متوسط">متوسط</option>
            <option value="پیشرفته">پیشرفته</option>
            </select>
        </div>
          <CategoryModal showModal={showModal} newTitle={newTitle} newLevel={newLevel} setShowModal={setShowModal} setNewTitle={setNewTitle} setNewLevel={setNewLevel} handleAddCourse={handleAddCourse}/>
      </div>
      <Suspense fallback={<p className="text-info">...در حال بارگذاری اطلاعات</p>}>
        <Await resolve={data.categories}>
          {(loadedCategories) => <CategoryList courses={sortedCourses} onEdit={handleEdit} onDelete={handleDelete}/>}
        </Await>
      </Suspense>
    </div>
  );
  
}


export async function categoriesLoader({  }) {
  return defer({
      categories: loadCategories(),
  });
}

const loadCategories = async () => {
  const response = await httpInterceptedService.get('/courseCategory/sieve');
  return response.data;
}


export default CourseCategories
