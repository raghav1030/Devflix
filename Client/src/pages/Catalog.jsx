import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/ApiConnector'
import { catalogData, categories } from '../services/ApiEndpoints'
import { getCatalogPageData } from '../services/operations/categoryOperations'
import CourseSlider from '../components/core/CatalogPage/CourseSlider'
import Course_Card from '../components/core/CatalogPage/Course_Card'

const Catalog = () => {


    const {catalogName} = useParams()
    const [catalogPageData , setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("");
    
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

    // console.log(catalogData)
    // console.log("catalogPageData?.selectedCategory.course" , catalogPageData?.selectedCategory.course)
    // console.log("catalogPageData?.differentCategory?.course" , catalogPageData?.differentCategory[0]?.course)
    // console.log("catalogPageData?.mostSellingCourses" , catalogPageData?.mostSellingCourses)


    return (
        <div className='text-white'>

        <div>
            <p>{`Home / Catalog /`}
            <span>
                {catalogPageData?.selectedCategory?.name}
            </span></p>
            <p> {catalogPageData?.selectedCategory?.name} </p>
            <p> {catalogPageData?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* section1 */}
            <div>
            <div>Courses to get you started</div>
                <div className=' flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div>
                    {/* {
                        catalogData?.differentCategory.map((category, index) => {

                             <CourseSlider Courses={category?.course} key={index}  /> 
                        })

                    } */}

                    <CourseSlider Courses={catalogPageData?.differentCategory[0]?.course}   /> 


                </div>
            </div>  

            {/* section2 */}
            <div>
            <div>Top Courses in {catalogPageData?.selectedCategory?.name}</div>
                <div>
                    {catalogData?.selectedCategory}
                    <CourseSlider Courses={catalogPageData?.selectedCategory?.course}/>
                </div>
            </div>

            {/* section3 */}
            <div>
                <div>Frequently Bought</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2'>

                        {
                            catalogPageData?.mostSellingCourses
                            .map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>
    <Footer />
    </div>
        
    )
}

export default Catalog