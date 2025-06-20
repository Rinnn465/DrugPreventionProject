import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Star, ArrowRight } from 'lucide-react';
import { SqlCourse } from '../../types/Course';

interface CourseCardProps {
  course: SqlCourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-gray-100 hover:border-primary-200">
      <div className="relative overflow-hidden">
        <img
          src={course.ImageUrl}
          alt={course.CourseName}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
            {course.Category.map(cat => cat.CategoryName).join(', ')}
          </span>
        </div>


        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-semibold text-gray-700">4.8</span>
        </div>

      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors duration-200 leading-tight min-h-[56px]">
          {course.CourseName}
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
          {course.Description}
        </p>


        {/* Course Stats */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
            <Users className="h-4 w-4 mr-2 text-green-500" />
            <span className="font-medium">{course.EnrollCount} người đã tham gia</span>
          </div>
        </div>


        {/* CTA Button */}
        <div className="mt-auto">
          <Link
            to={`/courses/${course.CourseID}`}
            className="group/btn w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Xem khóa học</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;