# Edammo Dashboard

Welcome to the Edammo Dashboard, please read through this document entirely before creating resources. Any questions or problems that may arise will likely be answered here, and if not, you can reach out to your Edammo contact if anything is not covered or clear.

# Table of Contents

- Overview
- Creating a Data Source
- Training a Multiclass or Regression Model
- Training a Time Series Model
- Creating a Prediction
- FAQs

# Overview

This dashboard is a tool that will allow you to quickly and efficiently leverage the state of the art Edammo predictor technology. You will be able to upload data, train models, and make predictions. In the navigation bar above, there are six links you can follow to access different parts of the dashboard: _Documentation, Data Sources, Models, Multiclass, Regression,_ and _Time Series_. The following sections will go into each page in more detail.

At a high level, in order to make predictions with a model, you first need to create a data source, train a model on that data source, and then ultimately create a prediction. Every time you create a resource, you will see a card pop up in the respective page with information pertaining to that resource. Here is an example card:

![example resource](assets/example_resource.png)

In the image above, the sample resource has a name, a description, a status message, and a status code located on the far right. The name and description will be set when you create the resource, however the status message and status code will change based on the current state of the resource. There are four possible status codes: `PENDING`, `PROCESSING`, `READY`, and `FAILED`. `PENDING` means that the resource has been accepted, but has not yet been picked up by the system. `PROCESSING` means that the resource has been picked up by the system, and is currently being verified or trained. `READY` means that the resource has completed successfully and is ready for use or for viewing (in the case of predictions). `FAILED` means that there was an error processing the resource, and a status message will be included below the resource with more information.

# Creating a Data Source

In order to create a data source, go to the _Data Sources_ tab above, and click the "+" button near the top of the page. After doing so, a modal screen with a number of options will pop up. You will have fields to enter a name and a description, the option to select whether the file has headers or sample identifiers, and the option to select a local file from your computer, or to enter the path of a resource that currently lives in Amazon S3.

The _name_ and _description_ fields are optional, and can be left blank if no name or description is required. The _Headers Included_ field should be set to "Yes" if the file has headers in the first row. The _First Column Sample IDs_ field should be set to "Yes" if the first column of your data contains unique identifiers (or any other information) for the samples in your data set, and should not be included in the training of the model. If this field is set incorrectly, it will likely cause issues when training a model. Finally, you can either upload a file from your computer, or if you have an existing data source that is uploaded to Amazon S3, you can select _Existing S3 Resource_ from the drop down menu, and insert the path in the format `s3://bucket-name/file-name`. For example, if your file lives in bucket "sample-bucket" in the location "data/tests/sample.csv", then the proper S3 URL would be `s3://sample-bucket/data/tests/sample.csv`. Please note that Edammo must be able to access this file in order to read the contents later on. If there are any issues with permissions, the resource will fail and a message will be displayed in the card.

**Note: Please see the FAQ at the bottom for rules on the format of a data source.**

# Training a Multiclass or Regression Model

Creating multiclass and regression models is completed through the _Models_ page of the dashboard. Similarly to creating a data source, clicking the "+" will open the model creation modal. You will have the option to select the data source you want to train the model with, whether the model type is multiclass or regression, add an optional name or description, the number of attributes for each sample in the data, and for multiclass only, the number of classes in the data set.

The _Data Source_ drop down allows you to easily choose a data source from the existing page. They are listed in the drop down by name, or as "unnamed data source" if you chose to leave the name field blank. the _Model Type_ field is to select whether you want a multiclass or regression model respectively. The next two fields allow you to add an optional name and description, just like in the data sources page. The next field, _Number of Attributes_, is the number of attributes, or variables, a sample has in your data set. If creating a multiclass model, this number should **NOT** include the class variable in the final column. Additionally, if your data set has sample identifiers in the first column, that should also be excluded from the variable count. The number of attributes should strictly include the number variables that make up each sample. The final field, _Number of Classes_, which only exists for multiclass models, should be the total number of classes that appear in the data set.

# Training a Time Series Model

If you want to create and predict with a time series model, navigate to the _Time Series_ tab above. Like the other pages, you can create a new model with the "+" button at the top. Creating a time series model will also predict on the data source that you include for training, so when a model successfully finishes processing, you will see a graph displayed below the model information which includes the data source and the predicted points. In the creation modal, you will have the option to select the data source you want to train & predict on, fields for an optional name and description, and the number of points ahead that you want to predict.

The _Data Source_ drop down allows you to easily choose a data source from the existing page. They are listed in the drop down by name, or as "unnamed data source" if you chose to leave the name field blank. The next two fields allow you to add an optional name and description, just like in the previous pages. The _Number of Points Ahead_ allows you to select how many points in the future you want to predict. The model will make a prediction for each point up to this value, so selecting 3 points into the future will return a prediction for 1, 2, and 3 points ahead.

# Creating a Multiclass or Regression Prediction

In order to create a prediction on a previously trained multiclass or regression model, navigate to the _Multiclass_ or _Regression_ tabs respectively. There are two types of predictions you can make: single point predictions, and batch predictions. A single point prediction allows you to quickly predict on a single sample, whereas a batch prediction allows for a prediction on multiple samples at once. For both model types, the requirements for creating a prediction are the same. A single point prediction needs a model and a data sample for prediction, while a batch prediction needs a model, a second data source to predict on, and an Amazon S3 path to write the results to.

For single point predictions, after selecting the model, the data sample to predict on needs to be included in the _Data Sample_ field. This should be entered as a comma separated string, and should match the number of attributes that the data had in training. An example data sample for a four-attribute data set could be: `1.5, 6.2, 0.7, 35`.

For batch predictions, you will need to create another data source with the prediction data samples. If you are creating a multiclass batch prediction, the prediction data should **NOT** include the classes in the file. Otherwise, these will be interpreted as another attribute, and will cause an error in prediction. After creating another data source, select it under the _Prediction Data Source_ drop down. In the final field, _S3 Output URL_, you will need to enter an Amazon S3 location to which the results will be written. This should be formatted in the same way as in the data sources page. Again, Edammo will need access to write to this location, otherwise an error will be thrown. If you want to make a batch prediction but do not have access to Amazon S3, please reach out to your Edammo contact, and we will facilitate the batch prediction and send you the results.

# FAQs

## What are the formatting rules for data sources?

Data sources should be well-formatted CSV files with all numerical values. The only exceptions for non-numerical values are if the file includes headers or sample identifiers, otherwise there will be an error validating the CSV. Additionally, data sources need to be complete, and cannot have any missing values for any samples.

If you are uploading a data source to train a regression or multiclass model, please ensure that the class variables or the value variables are in the **last** column of the file, and that they are **zero-indexed.** This means if you have 3 classes in your data set, they should be labelled as 0, 1, and 2, and **not** 1, 2, and 3.

If you are uploading a data source for a multiclass batch prediction, please remove the classes before hand, otherwise they will be interpreted as an extra attribute and will cause an error in prediction.

## My data source says it has a non-numerical value, but I don't have any non-numerical values in it?

There can be a few reasons why a data source might fail and report that a non-numerical value exists in the data. First, please ensure that you have selected the correct settings for headers and sample identifiers in your data source. If the file has either, but "No" was selected, the system will detect any non-numerical values in those sections and report an error.

If you have ensured that these settings reflect the file in question, please ensure that the encoding of the file is correct, and doesn't contain any extraneous hidden characters that are not numerical in nature. Additionally, please ensure that there are not any accidental extra commas after the last column in each row, as that will cause issues as well. If you have verified all of these are the case and are still having issues, please reach out to your Edammo contact for assistance.

## I am receiving the following error with a model or prediction: "The number of attributes differed between the model and data source". What does this mean?

This error is thrown when the number of attributes specified for a model differs from the number of attributes detected in the data source. If this occurs when training a model, it is likely that you have either entered the number of attributes incorrectly when creating the model, or the data source has an incorrect configuration. For example, if a data source has numerical sample identifiers, however the incorrect value was selected when creating the data source, the system will detect that column as an extra attribute, resulting in one more attribute than what was provided for the model. Alternatively, if you include the classes or the sample identifier columns into the count of attributes for a sample, this will result in the same error. Remember - the number of attributes should only include the number of variables for each sample, **excluding** class variables and sample identifiers.

## My resource is stuck in `PENDING` or `PROCESSING`, what is happening?

If your model is stuck in either of the above states, there are a few explanations for what could be happening. If the resource is stuck in `PENDING`, it likely means that the system is currently not online (likely for maintenance or other reasons). If none of your resources are exiting the `PENDING` state, please contact Edammo.

If your model is stuck in the `PROCESSING` state, it is possible that an extraneous error has occurred. If you are training a model on a large data set, or predicting on a large number of samples, it is likely running just fine, however if you are not using a large data set, or a significant amount of time has passed (10-15+ minutes), it is possible that an error occurred and needs to be handled manually. If this is the case, please contact Edammo and we will resolve the issue.

## My question or problem is not listed here. What can I do?

If you have any other questions or are running into any other issues that are not covered here, please contact Edammo and we will help you to work through any roadblocks you may be facing with our dashboard.
