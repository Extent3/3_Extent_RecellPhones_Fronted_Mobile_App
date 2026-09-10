import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets, } from 'react-native-safe-area-context';
import { apiCall, Spinner } from '../Util/AxiosUtil';
import { API_URLS } from '../Util/AppConst';
const recellBackIcon = require("../../Assets/BackIcon.png");



export default function EnquiryQuestion({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const details = JSON.parse(
        await AsyncStorage.getItem('details')
      );

      const modelId =
        route?.params?.modelId ||
        details?.selectedvariant?._id;

      if (!modelId) {
        setLoading(false);
        return;
      }
      setLoading(true);

      apiCall({
        method: 'GET',
        url: `${API_URLS.MODELS}/${modelId}?mobile=true`,
        setLoading,
        callback: handleModelResponse,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleModelResponse = (response) => {
    if (response.status === 200) {
      const modelData = response.data;

      const enquiryQuestionsData =
        modelData?.enquiryQuestions?.map(item => ({
          id: item?.defect?._id,
          name: item?.defect?.name,
          question: item?.defect?.question || item?.defect?.name,
          description: item?.defect?.description,
          price: item?.price,
        }));

      setQuestions(enquiryQuestionsData);
    }

    setLoading(false);
  };

  const handleAnswer = (name, answer) => {
    setAnswers(prev => ({
      ...prev,
      [name]: answer === 'No',
    }));
  };

  const handleContinue = async () => {
    const unanswered = questions.some(
      q => answers[q.name] === undefined,
    );

    if (unanswered) {
      alert('Please answer all questions');
      return;
    }

    try {
      const details = JSON.parse(
        await AsyncStorage.getItem('details'),
      );

      await AsyncStorage.setItem(
        'details',
        JSON.stringify({
          ...details,
          ...answers,
        }),
      );

      console.log('Answers =>', answers);

      // Warranty Logic
      if (answers.warranty === false) {
        navigation.navigate('WarrantyScreen', {
        });
        return;
      }

      // Dead Mobile Logic
      if (answers.deadMobile === true) {
        const trueDetails = Object.keys(
          answers,
        ).filter(
          key => answers[key] === true,
        );

        await AsyncStorage.setItem(
          'trueDetails',
          JSON.stringify(trueDetails),
        );

        setLoading(true);

        apiCall({
          method: 'POST',
          url: `${API_URLS.MODELS}/calculate-defects-price`,
          data: {
            defects: trueDetails,
            modelId:
              details?.selectedvariant?._id,
            ramStorage:
              details?.selectedvariant
                ?.ramStorage,
          },
          callback: async response => {
            setLoading(false);

            if (response.status === 200) {
              await AsyncStorage.setItem(
                'finalPrice',
                String(
                  response.data.totalPrice,
                ),
              );

              navigation.navigate(
                'DeviceDetails',
                {
                  modelId:
                    details?.selectedvariant
                      ?._id,
                  showFinalPrice: true,
                  finalPrice:
                    response.data.totalPrice,
                  variant: details?.selectedvariant,
                },
              );
            } else {
              alert(
                'Price calculation failed',
              );
            }
          },
        });

        return;
      }

      navigation.navigate(
        'DefectSelection',
        {
          type: 'bodyDefect',
          answers,
        },
      );
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      {loading && <Spinner />}
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={recellBackIcon}
            style={styles.backIcon}
            resizeMode="contain"
          />
          {/* <ChevronLeft size={24} color="#333" /> */}
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            Tell us more about your device
          </Text>

          <Text style={styles.subtitle}>
            Please answer a few questions about your device.
          </Text>
        </View>
      </View>

      {/* Questions */}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {questions.map((item) => (
          <View key={item.name} style={styles.card}>

            <Text style={styles.question}>
              {item.question}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <View style={styles.optionRow}>
              {['Yes', 'No'].map((option) => {
                // const selected = answers[item.name] === option;
                const selected =
                  (option === 'Yes' &&
                    answers[item.name] === false) ||
                  (option === 'No' &&
                    answers[item.name] === true);

                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      selected && styles.selectedButton,
                    ]}
                    onPress={() =>
                      handleAnswer(item.name, option)
                    }
                  >
                    <View
                      style={[
                        styles.radio,
                        selected && styles.radioSelected,
                      ]}
                    >
                      {selected && (
                        <View style={styles.radioDot} />
                      )}
                    </View>

                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.selectedText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

          </View>
        ))}
      </ScrollView>

      {/* Continue */}

      <View
        // style={styles.bottomContainer}
        style={[
          styles.bottomContainer,
          {
            paddingBottom: insets.bottom + 16,
          },
        ]}

      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}
          >
            Continue
          </Text>

          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backIcon: {
    width: 42,
    height: 42,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingTop: 40,
    elevation: 2,
  },

  backButton: {
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },

  scrollContainer: {
    padding: 16,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  question: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
    lineHeight: 18,
  },

  optionRow: {
    flexDirection: 'row',
    marginTop: 15,
  },

  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },

  selectedButton: {
    borderColor: '#0D8A4F',
    backgroundColor: '#F0FDF4',
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioSelected: {
    borderColor: '#0D8A4F',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0D8A4F',
  },

  optionText: {
    marginLeft: 10,
    color: '#555',
    fontWeight: '600',
    fontSize: 15,
  },

  selectedText: {
    color: '#0D8A4F',
  },

  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 20
  },


  continueButton: {
    backgroundColor: '#0D8A4F',
    borderRadius: 16,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  continueText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
});