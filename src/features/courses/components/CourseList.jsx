import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Course from './Course';
import { courses } from '../../../core/courses';

function CourseList() {
  // با استفاده از هوک یوزلودردیتا به لودر که در روتر جی اس ایکس تعریف کردیم و در پرنت این کامپوننت است درترسی داریم تا با استفاده از مپ رندر کنیم
  const loadedCourses = useLoaderData();

return (
  <>
    <div className="row">
      {/* {
        loadedCourses.map((course) => (
          <div className="col-3" key={course.id}>
            <Course {...course} />
          </div>
        ))
      } */}
      {
        courses.map((course) => (
          <div className="col-3" key={course.id}>
            <Course {...course} />
            </div>
        ))
      }
    </div>
  </>
);

}

export default CourseList
