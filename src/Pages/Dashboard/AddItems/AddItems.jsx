import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // Image upload api
    const imageUploadToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async (items) => {
        console.table(items)
        const image = items?.image[0];

        // Upload image to the Imgbb and then get an url
        try {
            const { data } = await axiosPublic.post(imageUploadUrl, { image }, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            console.log(data);
            if (data?.success) {
                const menuItems = {
                    name: items?.name,
                    category: items?.category,
                    price: parseFloat(items?.price),
                    recipe: items?.recipe,
                    image: data?.data?.display_url
                };

                // Send data to the back-end
                const menuRes = await axiosSecure.post('/menu', menuItems);
                console.log(menuRes);
                if(menuRes?.data?.insertedId) {
                    reset();
                    // Show a success message
                    Swal.fire({
                        title: "Successful",
                        text: "You have successfylly added an item",
                        icon: "success"
                    });
                }

            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <SectionTitle heading={'Add an item'} subHeading={"What's new"} />

            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-xl mx-auto my-6">
                    <div className="flex flex-col gap-1">
                        <label>Recipe Name*</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Type here a name"
                            className="input input-bordered input-error w-full"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <p className="text-orange-700">Please write a name</p>}
                    </div>

                    <div className="flex gap-6">
                        {/* Category */}
                        <div className="flex flex-col gap-1 w-full">
                            <label>Select a category here</label>
                            <select
                                name="category"
                                className="select select-primary w-full"
                                {...register("cetagory", { required: true })}
                            >
                                <option disabled selected>Select a category</option>
                                <option value={'salad'}>Salad</option>
                                <option value={'pizza'}>Pizza</option>
                                <option value={'soup'}>Soup</option>
                                <option value={'dessert'}>Dessert</option>
                                <option value={'drinks'}>Drinks</option>
                            </select>
                            {errors.name && <p className="text-orange-700">Please write a category</p>}
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-1 w-full">
                            <label>Price*</label>
                            <input
                                type="text"
                                name="price"
                                placeholder="Type here a price"
                                className="input input-bordered input-error w-full"
                                {...register("price", { required: true })}
                            />
                            {errors.name && <p className="text-orange-700">Please write a price</p>}
                        </div>
                    </div>

                    <div>
                        <label>Recipe details</label>
                        <textarea
                            name="recipe"
                            className="textarea textarea-success w-full pb-8"
                            placeholder="Bio"
                            {...register('recipe', { required: true })}
                        ></textarea>
                        {errors.name && <p className="text-orange-700">Please write a recipe details</p>}
                    </div>

                    <div>
                        <label htmlFor=""></label>
                        <input
                            type="file"
                            name="image"
                            className="file-input file-input-bordered file-input-info w-full max-w-xs"
                            {...register('image', { required: true })}
                        />
                        {errors.name && <p className="text-orange-700">Please input a photo here</p>}
                    </div>

                    <input type="submit" value={'Add item'} className="btn bg-amber-500" />
                </form>
            </div>
        </div>
    );
};

export default AddItems;