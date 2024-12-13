import { uploadImage } from './userService';
import { products } from './product';  // Giả sử bạn đã có một danh sách sản phẩm
import { supabase } from '../lib/supabase';

export const uploadAllImages = async () => {
    try {
        // Lặp qua từng sản phẩm trong danh sách và tải hình ảnh lên Supabase
        for (let product of products) {
            // Tạo tên file duy nhất cho từng sản phẩm, sử dụng tên sản phẩm
            const fileName = `product-images/${product.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;

            // Đảm bảo rằng 'product.image' là đường dẫn hợp lệ đến tệp hình ảnh cục bộ
            const imageUrl = await uploadImage(fileName, product.image);  // Sử dụng hàm uploadImage đã tạo

            // Cập nhật các trường 'name', 'description', 'category' và 'image_url' cho sản phẩm trong bảng 'product'
            const { data, error } = await supabase
                .from('product')
                .upsert([
                    {
                        name: product.name,
                        description: product.description,
                        category: product.category,
                        image_url: imageUrl,
                    }
                ], { onConflict: ['name'] });  // Sử dụng 'onConflict' để tránh trùng lặp khi đã có sản phẩm với tên tương tự

            if (error) {
                console.error(`Lỗi khi cập nhật thông tin cho sản phẩm ${product.name}:`, error.message);
                throw error;
            }

            console.log(`Thông tin của sản phẩm ${product.name} đã được cập nhật. URL hình ảnh: ${imageUrl}`);
        }

        console.log('Tải lên tất cả hình ảnh và cập nhật dữ liệu thành công');
    } catch (err) {
        console.error('Lỗi khi tải ảnh:', err.message);
    }
};

// Hàm lấy dữ liệu sản phẩm từ Supabase và có thể lọc theo category
export const getProductData = async (categoryFilter = null) => {
    try {
        // Lấy dữ liệu sản phẩm từ Supabase, có thể lọc theo category nếu có
        let query = supabase.from('product').select('*');
        if (categoryFilter) {
            query = query.eq('category', categoryFilter);
        }

        const { data, error } = await query;
        if (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error.message);
            throw error;
        }

        return data;  // Trả về dữ liệu sản phẩm
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', err.message);
        return [];
    }
};
