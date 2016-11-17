/**
 * Business rules are represented in simple JavaScript files and can be executed :
 *  1) In the web-browser / user interface manually via a call to the OpenIZBre.Execute() function
 *  2) In the disconnected client whenever data is persisted to/from the database
 *  3) On the server whenever data is persisted to the master data store.
 *
 * This pattern provides a mechanism for harmonizing business rules across devices/interfaces/etc. Because of this
 * the following considerations should be taken when writing business rules:
 *
 *  1) Use OpenIZ's tagging/extension model to ensure that the business rule has not already been run
 *  2) Use only basic JavaScript provided by OpenIZModel.js and OpenIZBre.js, there is no guarantee that the environment
 *     your rule is running in will be able to access network, file system or other services.
 *  3) If your rule does need to run in a particular service mechanism declare it using appropriate metadata syntax
 *
 *
 * Business rule metadata:
 *
 * Business rule metadata can be defined using three forward slashes and an XML tag. The supported directives are:
 *
 *  /// <reference path="XXX.js"/> 
 *      A reference to another javascript file. This file must be located in the current directory, or be one of openiz-model or openiz-bre.js
 *  /// <rules id="{UUID}" server="true|false"/>
 *      Uniquely identifies the rule (via id) and instructs the process that the BRE can run in the server container.
 *
 *  In this file, we pretend that we are writing a series of business rules related to an HPV exclusive programme by only allowing
 *  registration of Female patients. Of course, the real deployment of OpenIZ wouldn't behave this way, it would check the vaccine
 *  given and make a determination, however this example should provide a basic understanding of how business rules work in OpenIZ.
 */

/// <reference path="../.ref/js/openiz-model.js" />

/** 
 * Business rules are registered via RegisterRule this function needs three parameters:
 *  1) The object/type to which the rule applies
 *  2) The trigger when the rule should be fired
 *  3) A callback method which controls the rule itself
 *
 * This sample rule defines a behavior which only allows females to be registered
 */
OpenIZBre.AddBusinessRule("Patient", "BeforeInsert", /** @param {OpenIZModel.Patient} patient */function (patient) {

    // Ensure the rule hasn't been run
    if (patient.tag["org.sample.applet.rule.hpv"] === undefined) {

        // Check the rule
        if (patient.genderConceptModel.mnemonic != "female")
            throw new OpenIZModel.Exception("Males are not allowed!");

        patient.tag["org.sample.applet.rule.hpv"] = true;
    }
    // We have an opportunity to return our modified object which will store the copy provided
    return { value: patient };
});

/**
 * Validators are called prior to the persistence engine attempting a persistence event. This means that the decision to 
 * commit has not been determined yet. These are added with two parameters:
 *  1) The type which is being validated
 *  2) The callback which returns validation issues
 */
OpenIZBre.AddValidator("Patient", /** @param {OpenIZModel.Patient} patient */function (patient) {

    var retVal = new Array();

    if (patient == null)
        retVal.push(new OpenIZBre.DetectedIssue("Patient cannot be null", OpenIZBre.IssuePriority.Error));
    else {
        if (patient.genderConceptModel.mnemonic != "female")
            retVal.push(new OpenIZBre.DetectedIssue("HPV programme only applies to female patients", OpenIZBre.IssuePriority.Error));
        if (patient.dateOfBirthPrecision > new Date())
            retVal.push(new OpenIZBre.DetectedIssue("Only historical patients can be entered in the HPV programme", OpenIZBre.IssuePriority.Error));
        if (patient.identifier["HPVPGM"] == null)
            retVal.push(new OpenIZBre.DetectedIssue("Patients should have an HPV programme identifier", OpenIZBre.IssuePriority.Warning));
    }
    return retVal;

});
