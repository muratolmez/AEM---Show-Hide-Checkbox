/**
 * Extension to the standard checkbox component. It enables showing/hiding of other components based on the
 * selection made in the checkbox.
 *
 * How to use:
 *
 * - add the class cq-dialog-checkbox-showhide to the checkbox element
 * - add the data attribute cq-dialog-checkbox-showhide-target to the checkbox element, value should be the
 *   selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
 * - add the target class to each target component that can be shown/hidden
 * - add the class hidden to each target component to make them initially hidden
 * - add the attribute showhidetargetvalue to each target component, the value should equal the value of the select
 *   option that will unhide this element.  Leave this value as an empty string to toggle the target component on
 *   when the checkbox is unchecked.
 */
(function(document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        showHideHandler($(".cq-dialog-checkbox-showhide", e.target));
    });

    $(document).on("change", ".cq-dialog-checkbox-showhide", function(e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {
        el.each(function (i, element) {
            if($(element).is("coral-checkbox")) {
                // handle Coral3 base checkbox
                Coral.commons.ready(element, function (component) {
                    showHide(component, element);
                    component.on("change", function () {
                        showHide(component, element);
                    });
                });
            } else {
                // handle Coral2 based checkbox
                var component = $(element).attr("type");
                Coral.commons.ready(element, function (component) {
                    showHide(component, element);
                });
            }
        });
    }

    function showHide(component, element){
        // get the selector to find the target elements. its stored as data-.. attribute
        var target = $(element).data("cqDialogCheckboxShowhideTarget");
        var $target = $(target);
        if (target) {
            // is checkbox checked?
            var checked = $(element).prop('checked');
            // make sure all unselected target elements are hidden.
            $target.not(".hide").addClass("hide");
            // unhide the target element that contains the selected value as data-showhidetargetvalue attribute
            $target.filter("[data-showhidetargetvalue='" + checked + "']").removeClass("hide");

        }
    }

})(document,Granite.$);