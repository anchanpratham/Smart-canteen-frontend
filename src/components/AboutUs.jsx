import React from 'react';

const AboutUs = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Us</h1>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                    Welcome to <strong>TIFFIN ON TIME</strong>, your trusted college canteen partner designed specifically for pre-ordering foods and meals to ensure convenience and timely delivery.
                </p>
                <p>
                    We understand the busy lives of college students, where time is precious and every minute counts. That's why we've created a seamless platform that allows you to pre-order your favorite meals from your college canteen, ensuring that your food is ready exactly when you need it.
                </p>
                <p>
                    Our mission is to revolutionize the way students experience campus dining. By partnering directly with college canteens, we bridge the gap between your hunger and satisfaction, making sure that good food is always just a click away.
                </p>
                <p>
                    Whether you're rushing to class, studying late in the library, or simply want to avoid long queues, TIFFIN ON TIME is here to make your college life tastier and more convenient. Join thousands of satisfied students who have made pre-ordering their go-to solution for delicious, timely meals.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
