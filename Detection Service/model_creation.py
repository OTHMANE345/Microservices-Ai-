import numpy as np
import tensorflow as tf
from tensorflow import keras
from keras import layers, models
from keras.preprocessing.image import ImageDataGenerator

# Set the path to your dataset
dataset_path = "/home/oth/projects spring and react/m_p/Detection Service/dataset"

# Set the dimensions of the input images
image_width, image_height = 128, 128

# Set the batch size and number of training/validation steps
batch_size = 32
train_steps = 1000
val_steps = 200

# Create an ImageDataGenerator for data augmentation and normalization
data_augmentation = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)
  
# Load the training dataset
train_generator = data_augmentation.flow_from_directory(
    dataset_path + '/train',
    target_size=(image_width, image_height),
    batch_size=batch_size,
    class_mode='binary'
)

# Load the validation dataset
validation_generator = data_augmentation.flow_from_directory(
    dataset_path + '/val',
    target_size=(image_width, image_height),
    batch_size=batch_size,
    class_mode='binary'
)

# Define the CNN model
model = tf.keras.Sequential()
model.add(tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_width, image_height, 3)))
model.add(tf.keras.layers.MaxPooling2D((2, 2)))
model.add(tf.keras.layers.Conv2D(64, (3, 3), activation='relu'))
model.add(tf.keras.layers.MaxPooling2D((2, 2)))
model.add(tf.keras.layers.Conv2D(128, (3, 3), activation='relu'))
model.add(tf.keras.layers.MaxPooling2D((2, 2)))
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(128, activation='relu'))
model.add(tf.keras.layers.Dense(1, activation='sigmoid'))

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(
    train_generator,
    steps_per_epoch=train_steps,
    epochs=10,
    validation_data=validation_generator,
    validation_steps=val_steps
)

# Save the trained model in the recommended Keras format
model.save("snek_detection_model.keras") 