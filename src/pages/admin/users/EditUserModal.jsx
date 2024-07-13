import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  Box,
  Button,
  Dialog,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditUserModal = ({ betData, trigerType }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm <
  IssueFormData >
  {
    resolver: zodResolver(betSchema),
  };

  const selectOptions = [
    { label: "Success", value: "SUCCESS" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Lost", value: "LOST" },
  ];

  const submitForm = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      await axios.patch("/api/bets/" + betData.id, data);

      toast.success("Bet updated successful");

      reset();

      setOpen(false);

      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError(true);
    }
  });

  const deleteBet = async () => {
    try {
      setIsSubmitting(true);

      await axios.delete("/api/bets/" + betData.id);

      toast.success("Bet deleted successful");

      reset();

      setOpen(false);

      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            The operation was not successful.
          </AlertDialog.Description>
          <Flex mt={"4"} justify={"between"}>
            <Button
              className="bg-none"
              onClick={() => setError(false)}
              //   variant="soft"
            >
              Ok
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          {trigerType === "bet-card" ? (
            <Box>
              <BetCard betData={betData} />
            </Box>
          ) : (
            <span className="nav--link2">{betData.home_team}</span>
          )}
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Edit Bet</Dialog.Title>

          <form onSubmit={submitForm}>
            <Flex direction="column" gap="5">
              <Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
                <label>
                  <Text as="div" size="2" mb="1">
                    Home Team
                  </Text>
                  <TextField.Slot
                    defaultValue={betData.home_team}
                    placeholder=""
                    {...register("home_team")}
                  />
                  <ErrorMessage> {errors.home_team?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Away Team
                  </Text>
                  <TextField.Slot
                    defaultValue={betData.away_team}
                    placeholder=""
                    {...register("away_team")}
                  />
                  <ErrorMessage> {errors.away_team?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Bet Event
                  </Text>
                  <TextField.Slot
                    defaultValue={betData.bet}
                    placeholder=""
                    {...register("bet")}
                  />
                  <ErrorMessage> {errors.bet?.message}</ErrorMessage>
                </label>
              </Flex>

              <Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
                <label>
                  <Text as="div" size="2" mb="1">
                    Odd
                  </Text>
                  <TextField.Slot
                    defaultValue={parseFloat(betData.odd.toString())}
                    type="number"
                    step=".01"
                    {...register("odd")}
                  />
                  <ErrorMessage> {errors.odd?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Match Time
                  </Text>
                  <TextField.Slot
                    type="datetime-local"
                    {...register("match_time")}
                    defaultValue={moment(betData.match_time).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                  />
                  <ErrorMessage> {errors.match_time?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Bet Status
                  </Text>

                  <SelectInput
                    selectOptions={selectOptions}
                    defaultValue={betData.bet_status}
                    register={register("bet_status")}
                  />

                  <ErrorMessage> {errors.bet_status?.message}</ErrorMessage>
                </label>
              </Flex>

              <Separator color="gray" size="4" my={"3"} />

              <Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
                <label>
                  <Text as="div" size="2" mb="1">
                    HT Score Home
                  </Text>
                  <TextField.Slot
                    type="number"
                    {...register("ht_home_score")}
                    defaultValue={betData.ht_home_score?.toString()}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    HT Score Away
                  </Text>
                  <TextField.Slot
                    type="number"
                    {...register("ht_away_score")}
                    defaultValue={betData.ht_away_score?.toString()}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    FT Score Home
                  </Text>
                  <TextField.Slot
                    type="number"
                    {...register("ft_home_score")}
                    defaultValue={betData.ft_home_score?.toString()}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    FT Score Away
                  </Text>
                  <TextField.Slot
                    type="number"
                    {...register("ft_away_score")}
                    defaultValue={betData.ft_away_score?.toString()}
                  />
                </label>
              </Flex>
            </Flex>

            <Flex gap="3" mt="5" justify="between">
              <Box>
                <Button
                  variant="solid"
                  onClick={deleteBet}
                  color="red"
                  type="button"
                >
                  Delete
                </Button>
              </Box>
              <Flex gap={"3"}>
                <Dialog.Close>
                  <Button variant="soft" color="gray" onClick={() => reset()}>
                    Cancel
                  </Button>
                </Dialog.Close>
                {/* <Dialog.Close>
                  <Button type="submit">Save</Button>
                </Dialog.Close> */}
                <Button variant="solid" type="submit">
                  Save
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default EditUserModal;
