import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Image
} from 'react-native';

import Card from '../CustomComponent/Card';
import BottomNav from '../BottomNav/BottomNav';
const recellBackIcon = require("../../Assets/BackIcon.png");
import CustomSearchInputDropdown from '../CustomComponent/CustomSearchInputDropdown';

import { API_URLS } from '../Util/AppConst';
import { apiCall, Spinner } from '../Util/AxiosUtil';

export default function ModelScreen({ navigation, route }) {
    const { brand } = route.params || {};

    const [models, setModels] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const limit = 10;

    useEffect(() => {
        if (!brand) {
            return;
        }

        setModels([]);
        setModelData([]);
        setSearch('');

        getModels();

        getModelsAllData();
    }, [brand]);

    const getModels = () => {
        apiCall({
            method: 'GET',
            url: API_URLS.MODELNAMELIST,
            callback: getModelsCallback,
        });
    };

    const getModelsCallback = response => {
        if (response?.status === 200) {
            setModelData(response?.data || []);
        } else {
            setModelData([]);
        }
    };

    const handleSearchChange = value => {
        setSearch(value);
    };

    const getModelsAllData = async () => {
        setLoading(true);

        try {
            const firstRes = await new Promise(resolve => {
                apiCall({
                    method: 'GET',
                    url: `${API_URLS.MODELS}?brand_name=${brand}&offset=0&limit=${limit}`,
                    callback: resolve,
                });
            });

            if (firstRes?.status !== 200) {
                setModels([]);
                return;
            }

            const total = firstRes?.data?.totalCount || 0;

            const firstModels = firstRes?.data?.data || [];

            setModels(firstModels);

            const totalPages = Math.ceil(total / limit);

            const calls = [];

            for (let i = 1; i < totalPages; i++) {
                calls.push(
                    new Promise(resolve => {
                        apiCall({
                            method: 'GET',
                            url: `${API_URLS.MODELS}?brand_name=${brand}&offset=${i * limit
                                }&limit=${limit}`,
                            callback: resolve,
                        });
                    })
                );
            }

            const responses = await Promise.all(calls);

            const remainingModels = responses.flatMap(
                res => res?.data?.data || []
            );

            setModels(prev => [
                ...prev,
                ...remainingModels,
            ]);
        } catch (error) {
            console.log(
                'GET MODELS ERROR:',
                error
            );

            setModels([]);
        } finally {
            setLoading(false);
        }
    };

    const handleModelClick = model => {
        setSearch('');


        navigation.navigate(
            'DeviceDetails',
            {
                model: model?.name?.name || model?.name,
                modelId: model?._id,
                modelImage: model?.thumbnailBase64,
                brand: brand,
            }
        );
    };

    const renderModel = ({ item }) => {
        return (
            <Card
                item={item}
                image={item?.thumbnailBase64}
                label={item?.name?.name || item?.name}
                onPress={() =>
                    handleModelClick(item)
                }
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar
                barStyle="dark-content"
            />

            {loading && <Spinner />}

            <View style={styles.header}>

                <View style={styles.topRow}>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Brand')
                        }
                        style={styles.backButton}
                        hitSlop={{
                            top: 8,
                            bottom: 8,
                            left: 8,
                            right: 8,
                        }}
                    >
                        <Image
                            source={recellBackIcon}
                            style={styles.backIcon}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>

                    <Text style={styles.title}>
                        Select Your Device Model
                    </Text>

                </View>



                <CustomSearchInputDropdown
                    placeholder="Search model..."
                    options={modelData}
                    value={search}
                    onChange={handleSearchChange}
                    onSelect={handleModelClick}
                    getOptionLabel={item => item?.name?.name || item?.name
                    }
                />

            </View>

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                    Select Model
                </Text>

            </View>

            <FlatList
                style={styles.modelList}
                data={models}
                keyExtractor={(item, index) => item?._id || index}
                renderItem={renderModel}
                numColumns={3}

                contentContainerStyle={
                    styles.listContent
                }

                columnWrapperStyle={
                    styles.row
                }

                showsVerticalScrollIndicator={false}
            />

            <BottomNav currentScreen="Home" />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    backIcon: {
        width: 42,
        height: 42,
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        zIndex: 100,
    },

    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    backButton: {
        padding: 6,
        marginRight: 12,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        flexShrink: 1,
    },

    section: {
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 40,
        paddingTop: 16,
        paddingBottom: 12,

        zIndex: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
    },

    modelList: {
        flex: 1,
    },

    listContent: {
        paddingTop: 8,
        paddingBottom: 100,
    },

    row: {
        justifyContent: 'flex-start',
        paddingHorizontal: 32,
    },

});