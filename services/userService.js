import { supabase } from "../lib/supabase"

export const getUserData = async (userId) => {
    try {
        const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', userId)
        .single();

        if (error) {
            return {success: false, msg: error?.message}
        }
        return {success: true, data}
    } catch (error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message};
    }
}
export const updateUser = async (userId, data) => {
    try {
        const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', userId)

        if (error) {
            return {success: false, msg: error?.message}
        }
        
        return {success: true, data}
    } catch (error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message};
    }
}
export const deleteCarData = async (carId) => {
    try {
        const { data, error } = await supabase
        .from('car')
        .delete()
        .eq('id', carId)
        .select()
        if (error) {
            return {success: false, msg: error?.message}
        }
        return {success: true, data}
    } catch (error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message};
    }
}
export const getCarData = async (userId) => {
    try {
        const { data, error } = await supabase
        .from('car')
        .select('*')  
        .eq('user_id', userId)      
        // console.log(userId)
        if (error) {
            return {success: false, msg: error?.message}
        }
        // console.log("data>>>: ", data);
        
        return {success: true, data}
    } catch (error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message};
    }
}
export const insertCar = async (userId, carData) => {
    
    try {
        const { data, error } = await supabase
        .from('car')
        .insert({
            ...carData,
            user_id: userId
        })
        .select();
        
        if (error) {
            console.log(error?.message);
            
            return { success: false, msg: error?.message };
        }
        return { success: true, data };
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message };
    }
};
export const updateCarData = async (data, carId) => {
    console.log(carId);
    try {
        const { error } = await supabase
        .from('car')
        .update(data)
        .eq('id', carId)

        if (error) {
            return {success: false, msg: error?.message}
        }
        
        return {success: true, data}
    } catch (error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message};
    }
}
export const getAppointmentData = async (userId, roomId, workingHourId, appointmentId) => {
    try {
        const { data, error } = await supabase
        .from('appointment')
        .select('*')
        .eq('id', appointmentId) 
        .eq('day')     
        // .eq('user_id', userId)
        .eq('room_id', roomId)
        .eq('workingHour_id', workingHourId)
        // .single();        

        if (error) {
            return {success: false, msg: error?.message}
        }
        return {success: true, data}
    } catch (error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message};
    }
}
export const insertAppointment = async (userId, roomId, appointmentData, workingHourId, serviceId) => {
    try {
        const { data, error } = await supabase
            .from('appointment')
            .insert({
                ...appointmentData,
                user_id: userId,
                room_id: roomId,
                service_id: serviceId,
                workingHour_id: workingHourId,
            })
            .select();

        if (error) {
            return { success: false, msg: error?.message };
        }
        return { success: true, data };
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message };
    }
}

export const getServiceData = async (serviceId) => {
    try {
        const { data, error } = await supabase
            .from('services')
            .select('id, name, duration_minute,price')
            .eq('id', serviceId)
            .single();

        if (error) {
            return { success: false, msg: error?.message };
        }
        return { success: true, data };
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message };
    }
};

export const updateServiceData = async (serviceId, serviceData) => {
    try {
        const { data, error } = await supabase
            .from('services')
            .update(serviceData)
            .eq('id', serviceId);

        if (error) {
            return { success: false, msg: error?.message };
        }
        return { success: true, data };
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message };
    }
};

// Delete service data
export const deleteServiceData = async (serviceId) => {
    try {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('')
            .eq('id', serviceId);

        if (error) {
            return { success: false, msg: error?.message };
        }
        return { success: true, msg: "Service deleted successfully" };
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message };
    }
};

export const insertServiceData = async (serviceData) => {
    try {
        const { data, error } = await supabase
            .from('services')
            .insert(serviceData)
            .select();

        if (error) {
            return { success: false, msg: error?.message };
        }
        return { success: true, data };
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message };
    }
};

export const getWorkingHourData = async (workingHourId) => {
    try {
        // console.log(workingHourId)
        const { data, error } = await supabase
        .from('workingHour')
        .select('id, start_time, end_time')
        .eq('id', workingHourId)
        .single();

        if (error) {
            return {success: false, msg: error?.message}
        }
        return {success: true, data}
    } catch (error) {
        console.log('got error: ', error);
        return {success: false, msg: error.message};
    }
}
export const insertWorkingHourData = async (workingHourData, roomId) => {
    try {
        const { data, error } = await supabase
            .from('workingHour')
            .insert(workingHourData, roomId)
            .select();

        if (error) {
            return { success: false, msg: error?.message };
        }
        return { success: true, data };
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message };
    }
};
// export const deleteWorkingHourData = async
    export const getRoomData = async (roomId) => {
        // console.log(roomId);
        try {
            const { data, error } = await supabase
            .from('room')
            .select()
            .eq('id', roomId)
            .single();

            if (error) {
                return {success: false, msg: error?.message}
            }
            return {success: true, data}
        } catch (error) {
            console.log('got error: ', error);
            return {success: false, msg: error.message};
        }
    }
