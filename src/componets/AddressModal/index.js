import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
    ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    addAddressThunk,
    updateAddressThunk,
} from "../../redux/slice/addressSlice";
import styles from "./styles";

const AddressModal = ({ close, address }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);

    const [form, setForm] = useState({
        label: address?.label || "",
        fullName: address?.fullName || "",
        phone: address?.phone || "",
        street: address?.street || "",
        area: address?.area || "",
        city: address?.city || "",
        state: address?.state || "",
        country: address?.country || "",
        postalCode: address?.postalCode || "",
        isDefault: address?.isDefault || false,
    });


    const handleSave = async () => {
       

        try {
            if (address) {
                await dispatch(
                    updateAddressThunk({
                        token,
                        addressId: address._id,
                        payload: form,
                    })
                ).unwrap();
            } else {
                await dispatch(addAddressThunk({ token, payload: form })).unwrap();
            }

            console.log("Saved successfully");
            close();
        } catch (error) {
            console.log("Save error:", error);
        }
    };


    return (
        <ScrollView style={styles.modalContainer}>
            <Text style={styles.title}>
                {address ? "Update Address" : "Add Address"}
            </Text>
            <TextInput
                style={styles.input}

                placeholder="Full Name"
                value={form.fullName}
                onChangeText={(text) => setForm({ ...form, fullName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Label (Home / Office)"
                value={form.label}
                onChangeText={(text) => setForm({ ...form, label: text })}
            />
            <TextInput
                style={styles.input}

                placeholder="Area"
                value={form.area}
                onChangeText={(text) => setForm({ ...form, area: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Street"
                value={form.street}
                onChangeText={(text) => setForm({ ...form, street: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="City"
                value={form.city}
                onChangeText={(text) => setForm({ ...form, city: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="State"
                value={form.state}
                onChangeText={(text) => setForm({ ...form, state: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Country"
                value={form.country}
                onChangeText={(text) => setForm({ ...form, country: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={form.postalCode}
                onChangeText={(text) => setForm({ ...form, postalCode: text })}
            />


            <TextInput
                style={styles.input}

                placeholder="Phone Number"
                value={form.phone}
                keyboardType="phone-pad"
                onChangeText={(text) => setForm({ ...form, phone: text })}
            />



            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Set as Default</Text>
                <Switch
                    value={form.isDefault}
                    onValueChange={(value) =>
                        setForm({ ...form, isDefault: value })
                    }
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={close}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddressModal;
