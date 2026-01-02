import React from 'react'

export default function StatsSection() {
    return (
        <section className="bg-primary-50 rounded-xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                    <p className="text-3xl font-bold text-primary-600 mb-2">10,000+</p>
                    <p className="text-dark-600">Students Enrolled</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-primary-600 mb-2">200+</p>
                    <p className="text-dark-600">Courses Available</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-primary-600 mb-2">50+</p>
                    <p className="text-dark-600">Expert Instructors</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-primary-600 mb-2">95%</p>
                    <p className="text-dark-600">Satisfaction Rate</p>
                </div>
            </div>
        </section>
    )
}
