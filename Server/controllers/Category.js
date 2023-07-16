const { default: mongoose } = require('mongoose')
const Category = require('../models/Category')
const Course = require('../models/Course')

exports.createCategory = async (req, res) => {
    
    try{
        const {name, description} = req.body

        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : "Fill all the details"
            })
        }

        const updatedName = name.trim().split(" ").join('-').toLowerCase()

        const createCategory = await Category.create({name : updatedName, description : description})

        return res.status(200).json({
            success : true, 
            message : "Category created",
            Category : createCategory
        })
    } catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating a DB request for Category"
        })
    }
}


exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, {name : true, description : true})
        return res.status(200).json({
            success : true, 
            message : "All Categories fetched",
            data : allCategories
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while fetching all categories",
            
        })
    }
}

exports.categoryPageDetails = async (req, res) =>{
    
    try{
        const {categoryId} = req.body

        // categoryId = new mongoose.Types.ObjectId(categoryId)
        


        const selectedCategory = await Category.findById(categoryId).populate({
            path: "course",
            match: { status: "Published" },
            populate: {
              path: "instructor",
          },
          })
          .exec()

        if(!selectedCategory){
            return res.status(402).json({
                success : false,
                message : "Courses not found for the selected category"
            })
        }

        
        const differentCategory = await Category.find({_id : {$ne : categoryId}}).populate({
            path: "course",
            match: { status: "Published" },
            populate: {
              path: "instructor",
          },
          })
          .exec()

        if(!differentCategory){
            return res.status(404).json({
                success : false,
                message : "Courses not found for the Other categories"
            })
        }

        // const topSellingCourses = await Course.aggregate($project : {_id: 1, courseName : 1, num_users: {$size: "$studentsEnrolled"  }}, $sort : {num_users : -1}})

        const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published"  },
          populate: {
            path: "instructor",
        },
        })
        .exec()


        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10)


        if(!mostSellingCourses){
            return res.status(404).json({
                success : false,
                message : "Courses not found for the Top selling category"
            })
        }

        return res.status(200).json({
            success : true,
            data : {
                selectedCategory,
                differentCategory,
                mostSellingCourses
            },
            message : "Courses fetched for all categories"
        })


    } catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while fetching courses for all category"
        })
    }


}